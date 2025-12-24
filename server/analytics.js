import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

/**
 * Analytics Module
 * Provides data aggregation and analytics for dashboard reporting
 */

/**
 * Read parcels data
 */
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

/**
 * Get overview statistics
 */
export const getOverviewStats = () => {
    const parcels = readData();

    const stats = {
        totalOrders: parcels.length,
        delivered: parcels.filter(p => p.status === 'Delivered').length,
        inTransit: parcels.filter(p => p.status === 'In Transit').length,
        pending: parcels.filter(p => p.status === 'Pending Approval').length,
        cancelled: parcels.filter(p => p.status === 'Cancelled').length,
        deliveryRate: 0,
        revenue: 0
    };

    // Calculate delivery rate
    if (stats.totalOrders > 0) {
        stats.deliveryRate = ((stats.delivered / stats.totalOrders) * 100).toFixed(2);
    }

    // Calculate estimated revenue (dummy calculation based on type)
    const revenueMap = {
        'Express': 500,
        'Regular': 300,
        'Fragile': 450,
        'International': 1200
    };

    stats.revenue = parcels.reduce((total, parcel) => {
        return total + (revenueMap[parcel.type] || 300);
    }, 0);

    return stats;
};

/**
 * Get orders by status (for pie chart)
 */
export const getOrdersByStatus = () => {
    const parcels = readData();

    const statusCount = {};
    parcels.forEach(parcel => {
        statusCount[parcel.status] = (statusCount[parcel.status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count
    }));
};

/**
 * Get daily orders trend (last 7 days)
 */
export const getDailyOrdersTrend = (days = 7) => {
    const parcels = readData();
    const today = new Date();
    const trend = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const ordersOnDate = parcels.filter(p => {
            if (!p.date) return false;
            return p.date === dateStr;
        }).length;

        trend.push({
            date: dateStr,
            orders: ordersOnDate,
            formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
    }

    return trend;
};

/**
 * Get orders by type
 */
export const getOrdersByType = () => {
    const parcels = readData();

    const typeCount = {};
    parcels.forEach(parcel => {
        typeCount[parcel.type] = (typeCount[parcel.type] || 0) + 1;
    });

    return Object.entries(typeCount).map(([type, count]) => ({
        name: type,
        value: count
    }));
};

/**
 * Get revenue by date range
 */
export const getRevenueByDateRange = (startDate, endDate) => {
    const parcels = readData();

    const revenueMap = {
        'Express': 500,
        'Regular': 300,
        'Fragile': 450,
        'International': 1200
    };

    let totalRevenue = 0;
    const revenueByDate = {};

    parcels.forEach(parcel => {
        if (!parcel.date) return;

        const parcelDate = new Date(parcel.date);
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (parcelDate >= start && parcelDate <= end) {
            const revenue = revenueMap[parcel.type] || 300;
            totalRevenue += revenue;

            const dateStr = parcel.date;
            revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + revenue;
        }
    });

    return {
        totalRevenue,
        revenueByDate: Object.entries(revenueByDate).map(([date, revenue]) => ({
            date,
            revenue
        }))
    };
};

/**
 * Get recent activity (last 10 orders)
 */
export const getRecentActivity = (limit = 10) => {
    const parcels = readData();

    // Sort by date descending
    const sorted = [...parcels].sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date) - new Date(a.date);
    });

    return sorted.slice(0, limit);
};

/**
 * Export analytics data as CSV
 */
export const exportAnalyticsCSV = () => {
    const parcels = readData();

    const headers = ['ID', 'Sender', 'Receiver', 'Type', 'Status', 'Date', 'Phone'];
    const rows = parcels.map(p => [
        p.id,
        p.sender,
        p.receiver,
        p.type,
        p.status,
        p.date || 'N/A',
        p.senderPhone || 'N/A'
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
};

export default {
    getOverviewStats,
    getOrdersByStatus,
    getDailyOrdersTrend,
    getOrdersByType,
    getRevenueByDateRange,
    getRecentActivity,
    exportAnalyticsCSV
};
