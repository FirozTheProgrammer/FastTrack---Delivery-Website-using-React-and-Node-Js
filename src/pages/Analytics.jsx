import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, CheckCircle, Clock, Download, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

/**
 * Analytics Dashboard Page
 * Displays comprehensive analytics with charts and statistics
 */
const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [ordersByStatus, setOrdersByStatus] = useState([]);
    const [ordersByType, setOrdersByType] = useState([]);
    const [dailyTrend, setDailyTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            // Fetch all analytics data
            const [overviewRes, statusRes, typeRes, trendRes] = await Promise.all([
                fetch('http://localhost:3000/api/analytics/overview'),
                fetch('http://localhost:3000/api/analytics/orders-by-status'),
                fetch('http://localhost:3000/api/analytics/orders-by-type'),
                fetch('http://localhost:3000/api/analytics/daily-trend?days=7')
            ]);

            const overview = await overviewRes.json();
            const statusData = await statusRes.json();
            const typeData = await typeRes.json();
            const trendData = await trendRes.json();

            setStats(overview);
            setOrdersByStatus(statusData);
            setOrdersByType(typeData);
            setDailyTrend(trendData);
        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportReport = () => {
        window.location.href = 'http://localhost:3000/api/analytics/export';
    };

    const COLORS = {
        'Delivered': '#10b981',
        'In Transit': '#3b82f6',
        'Pending Approval': '#f59e0b',
        'Cancelled': '#ef4444',
        'Express': '#8b5cf6',
        'Regular': '#06b6d4',
        'Fragile': '#f97316',
        'International': '#ec4899'
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center h-64">
                            <div className="text-slate-600">Loading analytics...</div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
                            <p className="text-slate-600">Comprehensive insights into your delivery operations</p>
                        </div>
                        <button
                            onClick={exportReport}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
                        >
                            <Download size={18} />
                            Export Report
                        </button>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                                        <p className="text-3xl font-bold text-slate-900">{stats.totalOrders}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <Package className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Delivered</p>
                                        <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Delivery Rate</p>
                                        <p className="text-3xl font-bold text-primary-600">{stats.deliveryRate}%</p>
                                    </div>
                                    <div className="p-3 bg-primary-100 rounded-xl">
                                        <TrendingUp className="text-primary-600" size={24} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-600 mb-1">Revenue</p>
                                        <p className="text-3xl font-bold text-slate-900">৳{stats.revenue.toLocaleString()}</p>
                                    </div>
                                    <div className="p-3 bg-amber-100 rounded-xl">
                                        <TrendingUp className="text-amber-600" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Daily Orders Trend */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Daily Orders Trend (Last 7 Days)</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={dailyTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="formattedDate" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="orders" stroke="#667eea" strokeWidth={3} dot={{ fill: '#667eea', r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Orders by Status */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Orders by Status</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={ordersByStatus}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {ordersByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Orders by Type */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Orders by Type</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ordersByType}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="value" fill="#667eea" radius={[8, 8, 0, 0]}>
                                    {ordersByType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#667eea'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Analytics;
