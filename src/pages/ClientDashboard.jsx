import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchParcels();
        }
    }, [user]);

    const fetchParcels = async () => {
        try {
            const response = await fetch(`/api/parcels?clientId=${user.id}`);
            const data = await response.json();
            setParcels(data);
        } catch (error) {
            console.error('Error fetching parcels:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
                            <p className="text-slate-600">Welcome back, <span className="font-semibold text-primary-600">{user?.username}</span></p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/request">
                                <Button variant="primary" className="flex items-center gap-2">
                                    <Plus size={18} /> New Order
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                                <LogOut size={18} /> Logout
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Package className="text-primary-600" size={20} />
                                My Orders
                            </h2>
                        </div>

                        {loading ? (
                            <div className="p-12 text-center text-slate-500">Loading orders...</div>
                        ) : parcels.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <Package size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                                <p className="text-slate-500 mb-6">Create your first delivery request today.</p>
                                <Link to="/request">
                                    <Button variant="primary">Create Order</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Order ID</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Receiver</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Cost</th>
                                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {parcels.map((parcel) => (
                                            <tr key={parcel.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-mono font-medium text-primary-600">
                                                    {parcel.id}
                                                </td>
                                                <td className="px-6 py-4 text-slate-900">
                                                    {parcel.receiver}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold
                                                        ${parcel.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            parcel.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-yellow-100 text-yellow-700'}`}>
                                                        {parcel.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {parcel.price || '-'} Tk
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {parcel.date}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ClientDashboard;
