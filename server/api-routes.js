import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const API_KEYS_FILE = path.join(__dirname, 'api-keys.json');

/**
 * API Routes Module
 * Handles third-party API integration, API key management, and webhooks
 */

/**
 * Read API keys from file
 */
const readApiKeys = () => {
    if (!fs.existsSync(API_KEYS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(API_KEYS_FILE);
    return JSON.parse(data);
};

/**
 * Write API keys to file
 */
const writeApiKeys = (keys) => {
    fs.writeFileSync(API_KEYS_FILE, JSON.stringify(keys, null, 2));
};

/**
 * Verify API key middleware
 */
export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key required. Include X-API-Key header.'
        });
    }

    const keys = readApiKeys();
    const validKey = keys.find(k => k.key === apiKey && k.active);

    if (!validKey) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or inactive API key.'
        });
    }

    // Update last used timestamp
    validKey.lastUsed = new Date().toISOString();
    validKey.usageCount = (validKey.usageCount || 0) + 1;
    writeApiKeys(keys);

    // Attach key info to request
    req.apiKeyInfo = validKey;
    next();
};

/**
 * Generate new API key
 */
export const generateApiKey = (name, description = '') => {
    const keys = readApiKeys();

    const newKey = {
        id: uuidv4(),
        key: `ftc_${uuidv4().replace(/-/g, '')}`,
        name,
        description,
        createdAt: new Date().toISOString(),
        lastUsed: null,
        usageCount: 0,
        active: true
    };

    keys.push(newKey);
    writeApiKeys(keys);

    return newKey;
};

/**
 * Get all API keys
 */
export const getAllApiKeys = () => {
    return readApiKeys();
};

/**
 * Revoke API key
 */
export const revokeApiKey = (keyId) => {
    const keys = readApiKeys();
    const key = keys.find(k => k.id === keyId);

    if (!key) {
        return { success: false, message: 'API key not found' };
    }

    key.active = false;
    key.revokedAt = new Date().toISOString();
    writeApiKeys(keys);

    return { success: true, message: 'API key revoked successfully' };
};

/**
 * Delete API key permanently
 */
export const deleteApiKey = (keyId) => {
    let keys = readApiKeys();
    const initialLength = keys.length;

    keys = keys.filter(k => k.id !== keyId);

    if (keys.length === initialLength) {
        return { success: false, message: 'API key not found' };
    }

    writeApiKeys(keys);
    return { success: true, message: 'API key deleted successfully' };
};

/**
 * Webhook storage (in-memory for now, could be moved to JSON file)
 */
let webhooks = [];

/**
 * Register a webhook
 */
export const registerWebhook = (url, events = ['status_update']) => {
    const webhook = {
        id: uuidv4(),
        url,
        events,
        createdAt: new Date().toISOString(),
        active: true
    };

    webhooks.push(webhook);
    return webhook;
};

/**
 * Get all webhooks
 */
export const getAllWebhooks = () => {
    return webhooks;
};

/**
 * Delete webhook
 */
export const deleteWebhook = (webhookId) => {
    const initialLength = webhooks.length;
    webhooks = webhooks.filter(w => w.id !== webhookId);

    if (webhooks.length === initialLength) {
        return { success: false, message: 'Webhook not found' };
    }

    return { success: true, message: 'Webhook deleted successfully' };
};

/**
 * Trigger webhooks for an event
 */
export const triggerWebhooks = async (event, data) => {
    const activeWebhooks = webhooks.filter(w =>
        w.active && w.events.includes(event)
    );

    const results = [];

    for (const webhook of activeWebhooks) {
        try {
            const response = await fetch(webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Event': event
                },
                body: JSON.stringify({
                    event,
                    timestamp: new Date().toISOString(),
                    data
                })
            });

            results.push({
                webhookId: webhook.id,
                success: response.ok,
                status: response.status
            });
        } catch (error) {
            console.error(`Webhook ${webhook.id} failed:`, error.message);
            results.push({
                webhookId: webhook.id,
                success: false,
                error: error.message
            });
        }
    }

    return results;
};

export default {
    verifyApiKey,
    generateApiKey,
    getAllApiKeys,
    revokeApiKey,
    deleteApiKey,
    registerWebhook,
    getAllWebhooks,
    deleteWebhook,
    triggerWebhooks
};
