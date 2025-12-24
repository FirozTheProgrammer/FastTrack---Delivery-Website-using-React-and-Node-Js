import React, { useState, useEffect } from 'react';
import { Package, Trash2, Check, Truck, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AdminDashboard = () => {
    const [parcels, setParcels] = useState([]);

    // Load parcels from API
    useEffect(() => {
        fetch('/api/parcels')
            .then(res => res.json())
            .then(data => setParcels(data))
            .catch(err => console.error('Error fetching parcels:', err));
    }, []);

    /**
     * Updates the status of a parcel (e.g., Pending -> In Transit).
     * Sends a PUT request to the backend.
     * @param {number} index - Index of the parcel in local state.
     * @param {string} newStatus - The new status string.
     */
    const updateStatus = async (index, newStatus) => {
        const parcel = parcels[index];
        const updated = [...parcels];
        updated[index].status = newStatus;

        // Add to status history
        if (!updated[index].statusHistory) {
            updated[index].statusHistory = [];
        }
        updated[index].statusHistory.push({
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: `Status updated by admin`
        });

        setParcels(updated);

        try {
            await fetch(`/api/parcels/${parcel.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: newStatus,
                    statusHistory: updated[index].statusHistory
                })
            });
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    /**
     * Deletes a parcel from the system.
     * Sends a DELETE request to the backend.
     * @param {number} index - Index of the parcel to delete.
     */
    const deleteParcel = async (index) => {
        const parcel = parcels[index];
        const updated = parcels.filter((_, i) => i !== index);
        setParcels(updated);

        try {
            await fetch(`/api/parcels/${parcel.id}`, { method: 'DELETE' });
        } catch (err) {
            console.error('Error deleting parcel:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'In Transit': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Pending Approval': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                            <p className="text-slate-600">Manage inventory and delivery requests.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to="/bulk-upload"
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors"
                            >
                                📦 Bulk Upload
                            </Link>
                            <Link
                                to="/analytics"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                            >
                                📊 Analytics
                            </Link>
                            <Link
                                to="/api-settings"
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors"
                            >
                                🔑 API Settings
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
                                        <th className="p-4 text-sm font-semibold text-slate-600">Details</th>
                                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                        <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {parcels.map((parcel, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 align-top">
                                                <span className="font-mono text-sm font-bold text-primary-600">{parcel.id}</span>
                                                <div className="text-xs text-slate-400 mt-1">{parcel.date || 'No Date'}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium text-slate-900">{parcel.sender} ➝ {parcel.receiver}</div>
                                                <div className="text-sm text-slate-500">{parcel.type} • {parcel.notes || 'No notes'}</div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(parcel.status)}`}>
                                                    {parcel.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right align-top">
                                                <div className="flex justify-end gap-2">
                                                    {parcel.status === 'Pending Approval' && (
                                                        <button
                                                            onClick={() => updateStatus(idx, 'In Transit')}
                                                            title="Approve"
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                    )}
                                                    {parcel.status === 'In Transit' && (
                                                        <button
                                                            onClick={() => updateStatus(idx, 'Delivered')}
                                                            title="Mark Delivered"
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <Truck size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteParcel(idx)}
                                                        title="Delete"
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {parcels.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-12 text-center text-slate-500">
                                                No parcels found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;
