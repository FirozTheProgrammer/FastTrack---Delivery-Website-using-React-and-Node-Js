import React, { useState, useEffect } from 'react';
import { Key, Trash2, Plus, Copy, CheckCircle, Webhook, ExternalLink } from 'lucide-react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

/**
 * API Settings Page
 * Manage API keys and webhooks for third-party integrations
 */
const ApiSettings = () => {
    const [apiKeys, setApiKeys] = useState([]);
    const [webhooks, setWebhooks] = useState([]);
    const [showNewKeyForm, setShowNewKeyForm] = useState(false);
    const [showNewWebhookForm, setShowNewWebhookForm] = useState(false);
    const [copiedKey, setCopiedKey] = useState(null);

    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyDescription, setNewKeyDescription] = useState('');

    const [newWebhookUrl, setNewWebhookUrl] = useState('');
    const [newWebhookEvents, setNewWebhookEvents] = useState(['status_update']);

    useEffect(() => {
        loadApiKeys();
        loadWebhooks();
    }, []);

    const loadApiKeys = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/api-keys');
            const data = await response.json();
            setApiKeys(data);
        } catch (error) {
            console.error('Error loading API keys:', error);
        }
    };

    const loadWebhooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/webhooks');
            const data = await response.json();
            setWebhooks(data);
        } catch (error) {
            console.error('Error loading webhooks:', error);
        }
    };

    const generateApiKey = async () => {
        if (!newKeyName.trim()) {
            alert('Please enter a name for the API key');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/admin/api-keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newKeyName, description: newKeyDescription })
            });

            const data = await response.json();
            if (data.success) {
                await loadApiKeys();
                setNewKeyName('');
                setNewKeyDescription('');
                setShowNewKeyForm(false);
                alert('API key generated successfully!');
            }
        } catch (error) {
            console.error('Error generating API key:', error);
        }
    };

    const deleteApiKey = async (id) => {
        if (!confirm('Are you sure you want to delete this API key?')) return;

        try {
            await fetch(`http://localhost:3000/api/admin/api-keys/${id}`, {
                method: 'DELETE'
            });
            await loadApiKeys();
        } catch (error) {
            console.error('Error deleting API key:', error);
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const registerWebhook = async () => {
        if (!newWebhookUrl.trim()) {
            alert('Please enter a webhook URL');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/admin/webhooks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: newWebhookUrl, events: newWebhookEvents })
            });

            const data = await response.json();
            if (data.success) {
                await loadWebhooks();
                setNewWebhookUrl('');
                setShowNewWebhookForm(false);
                alert('Webhook registered successfully!');
            }
        } catch (error) {
            console.error('Error registering webhook:', error);
        }
    };

    const deleteWebhook = async (id) => {
        if (!confirm('Are you sure you want to delete this webhook?')) return;

        try {
            await fetch(`http://localhost:3000/api/admin/webhooks/${id}`, {
                method: 'DELETE'
            });
            await loadWebhooks();
        } catch (error) {
            console.error('Error deleting webhook:', error);
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">API Settings</h1>
                    <p className="text-slate-600 mb-8">Manage API keys and webhooks for third-party integrations</p>

                    {/* API Documentation Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <ExternalLink className="text-blue-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-blue-900 mb-2">API Documentation</h3>
                                <p className="text-blue-800 mb-3">Use these endpoints to integrate with Fast Track Courier:</p>
                                <div className="bg-white rounded-lg p-4 font-mono text-sm">
                                    <div className="mb-2"><span className="text-green-600 font-bold">GET</span> http://localhost:3000/api/v1/parcels</div>
                                    <div className="mb-2"><span className="text-blue-600 font-bold">POST</span> http://localhost:3000/api/v1/parcels</div>
                                    <div><span className="text-green-600 font-bold">GET</span> http://localhost:3000/api/v1/parcels/:id</div>
                                </div>
                                <p className="text-sm text-blue-700 mt-3">Include header: <code className="bg-blue-100 px-2 py-1 rounded">X-API-Key: your_api_key</code></p>
                            </div>
                        </div>
                    </div>

                    {/* API Keys Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">API Keys</h2>
                            <button
                                onClick={() => setShowNewKeyForm(!showNewKeyForm)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
                            >
                                <Plus size={18} />
                                Generate New Key
                            </button>
                        </div>

                        {showNewKeyForm && (
                            <div className="bg-slate-50 rounded-xl p-6 mb-6">
                                <h3 className="font-bold text-slate-900 mb-4">Create New API Key</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                                        <input
                                            type="text"
                                            value={newKeyName}
                                            onChange={(e) => setNewKeyName(e.target.value)}
                                            placeholder="e.g., Mobile App Integration"
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
                                        <textarea
                                            value={newKeyDescription}
                                            onChange={(e) => setNewKeyDescription(e.target.value)}
                                            placeholder="Brief description of what this key will be used for"
                                            rows={3}
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={generateApiKey}
                                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full"
                                        >
                                            Generate Key
                                        </button>
                                        <button
                                            onClick={() => setShowNewKeyForm(false)}
                                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {apiKeys.length === 0 ? (
                                <div className="text-center text-slate-500 py-8">
                                    No API keys yet. Generate one to get started.
                                </div>
                            ) : (
                                apiKeys.map((key) => (
                                    <div key={key.id} className="border border-slate-200 rounded-xl p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Key className="text-primary-600" size={18} />
                                                    <h3 className="font-bold text-slate-900">{key.name}</h3>
                                                    {!key.active && (
                                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Revoked</span>
                                                    )}
                                                </div>
                                                {key.description && (
                                                    <p className="text-sm text-slate-600 mb-2">{key.description}</p>
                                                )}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono">
                                                        {key.key}
                                                    </code>
                                                    <button
                                                        onClick={() => copyToClipboard(key.key, key.id)}
                                                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        {copiedKey === key.id ? (
                                                            <CheckCircle className="text-green-600" size={18} />
                                                        ) : (
                                                            <Copy className="text-slate-600" size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="flex gap-4 text-xs text-slate-500">
                                                    <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                                                    {key.lastUsed && (
                                                        <span>Last used: {new Date(key.lastUsed).toLocaleDateString()}</span>
                                                    )}
                                                    {key.usageCount !== undefined && (
                                                        <span>Uses: {key.usageCount}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteApiKey(key.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete API key"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Webhooks Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Webhooks</h2>
                            <button
                                onClick={() => setShowNewWebhookForm(!showNewWebhookForm)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
                            >
                                <Plus size={18} />
                                Add Webhook
                            </button>
                        </div>

                        {showNewWebhookForm && (
                            <div className="bg-slate-50 rounded-xl p-6 mb-6">
                                <h3 className="font-bold text-slate-900 mb-4">Register New Webhook</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Webhook URL *</label>
                                        <input
                                            type="url"
                                            value={newWebhookUrl}
                                            onChange={(e) => setNewWebhookUrl(e.target.value)}
                                            placeholder="https://your-domain.com/webhook"
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={registerWebhook}
                                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full"
                                        >
                                            Register Webhook
                                        </button>
                                        <button
                                            onClick={() => setShowNewWebhookForm(false)}
                                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {webhooks.length === 0 ? (
                                <div className="text-center text-slate-500 py-8">
                                    No webhooks configured. Add one to receive real-time updates.
                                </div>
                            ) : (
                                webhooks.map((webhook) => (
                                    <div key={webhook.id} className="border border-slate-200 rounded-xl p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Webhook className="text-primary-600" size={18} />
                                                    <code className="font-mono text-sm text-slate-900">{webhook.url}</code>
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Events: {webhook.events.join(', ')} • Created: {new Date(webhook.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteWebhook(webhook.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete webhook"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ApiSettings;
