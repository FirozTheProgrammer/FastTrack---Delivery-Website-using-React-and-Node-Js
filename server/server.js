import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const USERS_FILE = path.join(__dirname, 'users.json');

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
    const { status } = req.body;

    const index = parcels.findIndex(p => p.id === id);
    if (index !== -1) {
        parcels[index].status = status;
        writeData(parcels);
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
