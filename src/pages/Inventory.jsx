import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Inventory = () => {
    const [parcels, setParcels] = useState(() => {
        const saved = localStorage.getItem('fastTrackParcels');
        return saved ? JSON.parse(saved) : [
            { id: 'FT-1001', sender: 'Rahim Store', receiver: 'Karim Electronics', type: 'Regular', status: 'In Transit' },
            { id: 'FT-1002', sender: 'Dhaka Fashion', receiver: 'Ms. Sadia', type: 'Express', status: 'Delivered' },
            { id: 'FT-1003', sender: 'Tech World', receiver: 'Mr. Jamal', type: 'Fragile', status: 'Pending' }
        ];
    });
    const [showForm, setShowForm] = useState(false);
    const [newParcel, setNewParcel] = useState({
        id: '',
        sender: '',
        receiver: '',
        status: 'In Transit',
        type: 'Regular'
    });

    // Save parcels to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('fastTrackParcels', JSON.stringify(parcels));
    }, [parcels]);

    const handleAddParcel = (e) => {
        e.preventDefault();
        if (!newParcel.id || !newParcel.sender || !newParcel.receiver) return;

        setParcels([newParcel, ...parcels]);
        setNewParcel({
            id: '',
            sender: '',
            receiver: '',
            status: 'In Transit',
            type: 'Regular'
        });
        setShowForm(false);
    };

    const handleDeleteParcel = (index) => {
        const updatedParcels = parcels.filter((_, i) => i !== index);
        setParcels(updatedParcels);
    };

    const handleChange = (e) => {
        setNewParcel({ ...newParcel, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-slate-500 mb-2">
                                <Link to="/" className="hover:text-primary-600 flex items-center gap-1"><ArrowLeft size={16} /> Back to Home</Link>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">Parcel Inventory</h1>
                            <p className="text-slate-600">Manage and track all your shipments in one place.</p>
                        </div>
                        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
                            <Plus size={20} /> Add New Parcel
                        </Button>
                    </div>

                    {/* Add Parcel Form */}
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8 max-w-2xl mx-auto"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-4">New Shipment Details</h2>
                            <form onSubmit={handleAddParcel} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Tracking ID</label>
                                        <Input
                                            name="id"
                                            placeholder="e.g. FT-1001"
                                            value={newParcel.id}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                        <select
                                            name="type"
                                            value={newParcel.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                        >
                                            <option>Regular</option>
                                            <option>Express</option>
                                            <option>Fragile</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Sender Name</label>
                                        <Input
                                            name="sender"
                                            placeholder="Sender Name"
                                            value={newParcel.sender}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Receiver Name</label>
                                        <Input
                                            name="receiver"
                                            placeholder="Receiver Name"
                                            value={newParcel.receiver}
                                            onChange={handleChange}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={newParcel.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-slate-900"
                                    >
                                        <option>In Transit</option>
                                        <option>Delivered</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-2 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Button type="submit">Save Parcel</Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Inventory Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        {parcels.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Sender</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Receiver</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Type</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                            <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {parcels.map((parcel, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="p-4 font-mono text-sm font-bold text-primary-600">{parcel.id}</td>
                                                <td className="p-4 text-slate-900">{parcel.sender}</td>
                                                <td className="p-4 text-slate-900">{parcel.receiver}</td>
                                                <td className="p-4 text-slate-600 text-sm">{parcel.type}</td>
                                                <td className="p-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                            ${parcel.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            parcel.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                                                parcel.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {parcel.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteParcel(idx)}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center text-slate-500">
                                <Package size={48} className="mx-auto mb-4 text-slate-300" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No parcels found</h3>
                                <p className="mb-6">Start by adding your first shipment to the inventory.</p>
                                <Button onClick={() => setShowForm(true)}>Create Shipment</Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Inventory;
