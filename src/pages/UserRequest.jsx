import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Calculator } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const UserRequest = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        sender: '',
        senderPhone: '',
        receiver: '',
        receiverPhone: '',
        receiverAddress: '',
        // New fields
        location: 'Inside Dhaka',
        category: 'Standard',
        speed: 'Regular',
        notes: ''
    });

    const [price, setPrice] = useState(0);

    // Pre-fill user data if logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                sender: user.username || '',
                senderPhone: user.phone || ''
            }));
        }
    }, [user]);

    // Pricing Rules
    useEffect(() => {
        let calculatedPrice = 0;
        const { location, category, speed } = formData;

        if (location === 'Inside Dhaka') {
            if (category === 'Document') {
                calculatedPrice = 70;
            } else if (category === 'Fragile') {
                calculatedPrice = speed === 'Express' ? 140 : 100;
            } else { // Standard
                calculatedPrice = speed === 'Express' ? 150 : 70;
            }
        } else { // Outside Dhaka
            // Express is disabled for Outside Dhaka
            if (category === 'Document') {
                calculatedPrice = 100;
            } else if (category === 'Fragile') {
                calculatedPrice = 160;
            } else { // Standard
                calculatedPrice = 120;
            }
        }
        setPrice(calculatedPrice);
    }, [formData.location, formData.category, formData.speed]);

    const generateId = () => `REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Auto-fix Express constraint for Outside Dhaka
        if (name === 'location' && value === 'Outside Dhaka') {
            setFormData(prev => ({ ...prev, [name]: value, speed: 'Regular' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.sender || !formData.receiver || !formData.senderPhone || !formData.receiverPhone || !formData.receiverAddress) return;

        const newRequest = {
            id: generateId(),
            ...formData,
            clientId: user?.id, // Link to user account if logged in
            price: price, // Verify price matches frontend calculation, maybe recalculate? Trusting frontend for now as per simple req.
            type: formData.category, // Map category back to type for legacy support if needed, or just use category
            status: 'Pending Approval',
            date: new Date().toISOString().split('T')[0]
        };

        try {
            await fetch('/api/parcels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequest)
            });
            alert(`Order Placed! ID: ${newRequest.id}. Total Cost: ${price} Tk`);
            navigate('/');
        } catch (err) {
            console.error('Error creating request:', err);
            alert('Failed to submit request. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Link to="/" className="text-slate-500 hover:text-primary-600 flex items-center gap-1 mb-6">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                <Send size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">Request Delivery</h1>
                            <p className="text-slate-600 mt-2">Get an instant price quote and schedule your pickup.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Sender Name</label>
                                    <Input
                                        name="sender"
                                        placeholder="e.g. Your Name"
                                        value={formData.sender}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Sender Phone</label>
                                    <Input
                                        name="senderPhone"
                                        placeholder="e.g. 01712345678"
                                        value={formData.senderPhone}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Receiver Name</label>
                                    <Input
                                        name="receiver"
                                        placeholder="e.g. Recipient Name"
                                        value={formData.receiver}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Receiver Phone</label>
                                    <Input
                                        name="receiverPhone"
                                        placeholder="e.g. 01787654321"
                                        value={formData.receiverPhone}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Receiver Exact Address</label>
                                    <textarea
                                        name="receiverAddress"
                                        rows="2"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                        placeholder="House #, Road #, Area..."
                                        value={formData.receiverAddress}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4">Parcel Details</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                                        <select
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                        >
                                            <option>Inside Dhaka</option>
                                            <option>Outside Dhaka</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                        >
                                            <option>Standard</option>
                                            <option>Fragile</option>
                                            <option>Document</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Speed</label>
                                        <select
                                            name="speed"
                                            value={formData.speed}
                                            onChange={handleChange}
                                            disabled={formData.location === 'Outside Dhaka' || formData.category === 'Document'}
                                            className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900 ${formData.location === 'Outside Dhaka' || formData.category === 'Document' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50'}`}
                                        >
                                            <option>Regular</option>
                                            <option>Express</option>
                                        </select>
                                        {formData.location === 'Outside Dhaka' && <p className="text-xs text-orange-500 mt-1">Express available only inside Dhaka.</p>}
                                    </div>

                                    {/* Price Display */}
                                    <div className="flex flex-col justify-end">
                                        <div className="bg-primary-50 rounded-xl p-4 flex items-center justify-between border border-primary-100">
                                            <div className="flex items-center gap-2 text-primary-800">
                                                <Calculator size={20} />
                                                <span className="font-semibold">Total Cost</span>
                                            </div>
                                            <span className="text-2xl font-bold text-primary-700">{price} <span className="text-sm font-medium">Tk</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    rows="2"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                    placeholder="Any special instructions..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                                Confirm Order ({price} Tk)
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default UserRequest;
