import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import csvParser from 'csv-parser';
import xlsx from 'xlsx';

// Import custom modules
import * as analytics from './analytics.js';
import * as notifications from './notifications.js';
import * as apiRoutes from './api-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Configure multer for file uploads
const upload = multer({
    dest: path.join(__dirname, 'uploads/'),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(cors());
app.use(express.json());

/**
 * Reads the data.json file from the disk.
 * Returns an empty array if the file does not exist.
 * @returns {Array} The list of parcels.
 */
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

/**
 * Writes the given data to the data.json file.
 * @param {Array} data - The list of parcels to save.
 */
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

const writeUsers = (data) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
};

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    writeData([
        { id: 'FT-1001', sender: 'Rahim Store', senderPhone: '01700000000', receiver: 'Karim Electronics', type: 'Regular', status: 'In Transit', date: '2023-10-25' },
        { id: 'FT-1002', sender: 'Dhaka Fashion', receiver: 'Ms. Sadia', type: 'Express', status: 'Delivered', date: '2023-10-24' },
        { id: 'FT-1003', sender: 'Tech World', receiver: 'Mr. Jamal', type: 'Fragile', status: 'Pending Approval', date: '2023-10-26' }
    ]);
}

// Routes

/**
 * GET /api/parcels
 * Retrieves all valid parcels from the database.
 * Supports filtering by ?clientId=...
 */
app.get('/api/parcels', (req, res) => {
    const parcels = readData();
    const { clientId } = req.query;

    if (clientId) {
        const clientParcels = parcels.filter(p => p.clientId === clientId);
        res.json(clientParcels);
    } else {
        res.json(parcels);
    }
});

/**
 * POST /api/parcels
 * Creates a new parcel delivery request.
 * Expects a JSON body with parcel details.
 */
app.post('/api/parcels', (req, res) => {
    const parcels = readData();
    const newParcel = req.body;
    parcels.unshift(newParcel); // Add to beginning
    writeData(parcels);
    res.json(newParcel);
});

/**
 * POST /api/track
 * Verifies and retrieves a parcel using ID and Sender Phone Number.
 */
app.post('/api/track', (req, res) => {
    const parcels = readData();
    const { id, phone } = req.body;

    // Remove status check here if we want to show all parcels regardless of status
    // Or keep it if we only track active ones. For now, we search by ID first.
    const parcel = parcels.find(p => p.id === id);

    if (!parcel) {
        return res.status(404).json({ success: false, message: 'Parcel not found' });
    }

    // Verify phone number (simple string match for now)
    if (parcel.senderPhone === phone) {
        res.json({ success: true, parcel });
    } else {
        res.status(403).json({ success: false, message: 'Verification failed. Phone number does not match.' });
    }
});

/**
 * PUT /api/parcels/:id
 * Updates the status of a specific parcel.
 */
app.put('/api/parcels/:id', (req, res) => {
    const parcels = readData();
    const { id } = req.params;
    const { status, statusHistory } = req.body;

    const index = parcels.findIndex(p => p.id === id);
    if (index !== -1) {
        parcels[index].status = status;

        // Update status history if provided
        if (statusHistory) {
            parcels[index].statusHistory = statusHistory;
        }

        writeData(parcels);

        // Trigger webhooks for status update
        apiRoutes.triggerWebhooks('status_update', {
            parcelId: id,
            newStatus: status,
            parcel: parcels[index]
        }).catch(err => console.error('Webhook trigger error:', err));

        res.json(parcels[index]);
    } else {
        res.status(404).json({ message: 'Parcel not found' });
    }
});

/**
 * DELETE /api/parcels/:id
 * Removes a parcel from the database permanently.
 */
app.delete('/api/parcels/:id', (req, res) => {
    let parcels = readData();
    const { id } = req.params;
    const initialLength = parcels.length;

    parcels = parcels.filter(p => p.id !== id);

    if (parcels.length < initialLength) {
        writeData(parcels);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ message: 'Parcel not found' });
    }
});

/**
 * POST /api/register
 * Creates a new client user.
 */
app.post('/api/register', (req, res) => {
    try {
        const { username, password, phone, email } = req.body;
        // console.log('Registering:', username); 

        const users = readUsers();

        if (!username || !password || !phone || !email) {
            return res.status(400).json({ success: false, message: 'All fields (Username, Password, Phone, Email) are required.' });
        }

        // Gmail Verification (Format)
        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({ success: false, message: 'Only Gmail accounts (@gmail.com) are allowed.' });
        }

        // Uniqueness Checks
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }
        if (users.find(u => u.phone === phone)) {
            return res.status(400).json({ success: false, message: 'Phone number already registered.' });
        }
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        const newUser = {
            id: `USER-${Date.now()}`,
            username,
            password,
            phone,
            email,
            role: 'client'
        };

        users.push(newUser);
        writeUsers(users);

        res.json({ success: true, user: { id: newUser.id, username, role: 'client' } });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
    }
});

/**
 * POST /api/login
 * Authenticates the user (Admin or Client).
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 1. Check Admin
    if (username === 'admin' && password === 'admin123') {
        return res.json({ success: true, token: 'mock-admin-token', user: { username: 'admin', role: 'admin' } });
    }

    // 2. Check Clients
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, token: `mock-user-token-${user.id}`, user: { id: user.id, username: user.username, role: 'client' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

/**
 * POST /api/contact
 * Sends an email from the contact form.
 */
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Transporter configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR_EMAIL@gmail.com', // Replace with your email
            pass: 'YOUR_APP_PASSWORD'     // Replace with your App Password
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender address
        to: 'firozhasan1542@gmail.com', // Receiver address
        subject: `Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
});

// ========================================
// BULK UPLOAD ENDPOINT
// ========================================

/**
 * POST /api/parcels/bulk
 * Upload multiple orders via CSV or Excel file
 */
app.post('/api/parcels/bulk', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        const parcels = readData();
        const results = {
            success: [],
            errors: []
        };

        let rows = [];

        // Parse CSV
        if (fileExt === '.csv') {
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csvParser())
                    .on('data', (row) => rows.push(row))
                    .on('end', resolve)
                    .on('error', reject);
            });
        }
        // Parse Excel
        else if (fileExt === '.xlsx' || fileExt === '.xls') {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        }
        else {
            fs.unlinkSync(filePath); // Clean up
            return res.status(400).json({
                success: false,
                message: 'Invalid file format. Please upload CSV or Excel file.'
            });
        }

        // Process each row
        rows.forEach((row, index) => {
            try {
                // Validate required fields
                if (!row.Sender || !row.Receiver || !row.Type) {
                    results.errors.push({
                        row: index + 2, // +2 because of header and 0-indexing
                        error: 'Missing required fields (Sender, Receiver, or Type)'
                    });
                    return;
                }

                const newParcel = {
                    id: row.ID || `FT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    sender: row.Sender,
                    receiver: row.Receiver,
                    type: row.Type,
                    status: row.Status || 'Pending Approval',
                    date: row.Date || new Date().toISOString().split('T')[0],
                    senderPhone: row.SenderPhone || '',
                    receiverPhone: row.ReceiverPhone || '',
                    address: row.Address || '',
                    notes: row.Notes || '',
                    statusHistory: [{
                        status: row.Status || 'Pending Approval',
                        timestamp: new Date().toISOString(),
                        note: 'Order created via bulk upload'
                    }]
                };

                parcels.unshift(newParcel);
                results.success.push(newParcel);
            } catch (error) {
                results.errors.push({
                    row: index + 2,
                    error: error.message
                });
            }
        });

        // Save updated data
        writeData(parcels);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            message: `Bulk upload complete. ${results.success.length} orders created, ${results.errors.length} errors.`,
            totalProcessed: rows.length,
            successCount: results.success.length,
            errorCount: results.errors.length,
            errors: results.errors
        });
    } catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during bulk upload',
            error: error.message
        });
    }
});

// ========================================
// ANALYTICS ENDPOINTS
// ========================================

/**
 * GET /api/analytics/overview
 * Get overview statistics
 */
app.get('/api/analytics/overview', (req, res) => {
    try {
        const stats = analytics.getOverviewStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /api/analytics/orders-by-status
 * Get orders grouped by status
 */
app.get('/api/analytics/orders-by-status', (req, res) => {
    try {
        const data = analytics.getOrdersByStatus();
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /api/analytics/orders-by-type
 * Get orders grouped by type
 */
app.get('/api/analytics/orders-by-type', (req, res) => {
    try {
        const data = analytics.getOrdersByType();
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /api/analytics/daily-trend
 * Get daily orders trend
 */
app.get('/api/analytics/daily-trend', (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;
        const data = analytics.getDailyOrdersTrend(days);
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /api/analytics/export
 * Export analytics data as CSV
 */
app.get('/api/analytics/export', (req, res) => {
    try {
        const csv = analytics.exportAnalyticsCSV();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=orders-export.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========================================
// API KEY MANAGEMENT ENDPOINTS
// ========================================

/**
 * GET /api/admin/api-keys
 * Get all API keys (admin only)
 */
app.get('/api/admin/api-keys', (req, res) => {
    try {
        const keys = apiRoutes.getAllApiKeys();
        res.json(keys);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * POST /api/admin/api-keys
 * Generate new API key (admin only)
 */
app.post('/api/admin/api-keys', (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }

        const newKey = apiRoutes.generateApiKey(name, description);
        res.json({ success: true, apiKey: newKey });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * DELETE /api/admin/api-keys/:id
 * Delete an API key (admin only)
 */
app.delete('/api/admin/api-keys/:id', (req, res) => {
    try {
        const result = apiRoutes.deleteApiKey(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * PUT /api/admin/api-keys/:id/revoke
 * Revoke an API key (admin only)
 */
app.put('/api/admin/api-keys/:id/revoke', (req, res) => {
    try {
        const result = apiRoutes.revokeApiKey(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========================================
// WEBHOOK ENDPOINTS
// ========================================

/**
 * GET /api/admin/webhooks
 * Get all webhooks
 */
app.get('/api/admin/webhooks', (req, res) => {
    try {
        const webhooks = apiRoutes.getAllWebhooks();
        res.json(webhooks);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * POST /api/admin/webhooks
 * Register a new webhook
 */
app.post('/api/admin/webhooks', (req, res) => {
    try {
        const { url, events } = req.body;

        if (!url) {
            return res.status(400).json({ success: false, message: 'URL is required' });
        }

        const webhook = apiRoutes.registerWebhook(url, events);
        res.json({ success: true, webhook });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * DELETE /api/admin/webhooks/:id
 * Delete a webhook
 */
app.delete('/api/admin/webhooks/:id', (req, res) => {
    try {
        const result = apiRoutes.deleteWebhook(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========================================
// THIRD-PARTY API ENDPOINTS (with API key auth)
// ========================================

/**
 * GET /api/v1/parcels
 * Public API endpoint for getting parcels (requires API key)
 */
app.get('/api/v1/parcels', apiRoutes.verifyApiKey, (req, res) => {
    try {
        const parcels = readData();
        res.json({ success: true, data: parcels, apiKeyName: req.apiKeyInfo.name });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * POST /api/v1/parcels
 * Public API endpoint for creating parcels (requires API key)
 */
app.post('/api/v1/parcels', apiRoutes.verifyApiKey, (req, res) => {
    try {
        const parcels = readData();
        const newParcel = {
            ...req.body,
            id: req.body.id || `FT-${Date.now()}`,
            date: req.body.date || new Date().toISOString().split('T')[0],
            status: req.body.status || 'Pending Approval',
            statusHistory: [{
                status: req.body.status || 'Pending Approval',
                timestamp: new Date().toISOString(),
                note: 'Created via API'
            }]
        };

        parcels.unshift(newParcel);
        writeData(parcels);

        res.json({ success: true, data: newParcel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET /api/v1/parcels/:id
 * Public API endpoint for getting a single parcel (requires API key)
 */
app.get('/api/v1/parcels/:id', apiRoutes.verifyApiKey, (req, res) => {
    try {
        const parcels = readData();
        const parcel = parcels.find(p => p.id === req.params.id);

        if (!parcel) {
            return res.status(404).json({ success: false, message: 'Parcel not found' });
        }

        res.json({ success: true, data: parcel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
