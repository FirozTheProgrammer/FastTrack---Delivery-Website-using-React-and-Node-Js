import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const UserRequest = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sender: '',
        receiver: '',
        type: 'Regular',
        notes: ''
    });

    const generateId = () => `REQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.sender || !formData.receiver) return;

        const newRequest = {
            id: generateId(),
            ...formData,
            status: 'Pending Approval',
            date: new Date().toISOString().split('T')[0]
        };

        try {
            await fetch('/api/parcels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequest)
            });
            alert(`Delivery Request Sent! ID: ${newRequest.id}`);
            navigate('/');
        } catch (err) {
            console.error('Error creating request:', err);
            alert('Failed to submit request. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                            <p className="text-slate-600 mt-2">Fill in the details below and we'll pick it up.</p>
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
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Receiver Name</label>
                                    <Input
                                        name="receiver"
                                        placeholder="e.g. Recipient Name"
                                        value={formData.receiver}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                >
                                    <option>Regular</option>
                                    <option>Express</option>
                                    <option>Fragile</option>
                                    <option>Documents</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                    placeholder="Any special instructions..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                                Submit Request
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
