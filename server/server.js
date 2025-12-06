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

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    writeData([
        { id: 'FT-1001', sender: 'Rahim Store', receiver: 'Karim Electronics', type: 'Regular', status: 'In Transit', date: '2023-10-25' },
        { id: 'FT-1002', sender: 'Dhaka Fashion', receiver: 'Ms. Sadia', type: 'Express', status: 'Delivered', date: '2023-10-24' },
        { id: 'FT-1003', sender: 'Tech World', receiver: 'Mr. Jamal', type: 'Fragile', status: 'Pending Approval', date: '2023-10-26' }
    ]);
}

// Routes
app.get('/api/parcels', (req, res) => {
    const parcels = readData();
    res.json(parcels);
});

app.post('/api/parcels', (req, res) => {
    const parcels = readData();
    const newParcel = req.body;
    parcels.unshift(newParcel); // Add to beginning
    writeData(parcels);
    res.json(newParcel);
});

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

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials for simplicity
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'mock-token-123', user: { username: 'admin', role: 'admin' } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
