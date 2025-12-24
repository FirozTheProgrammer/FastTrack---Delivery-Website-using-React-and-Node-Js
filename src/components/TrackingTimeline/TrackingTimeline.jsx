import React from 'react';
import { CheckCircle, Clock, Truck, Package, XCircle } from 'lucide-react';

/**
 * TrackingTimeline Component
 * Displays the status history of an order in a visual timeline
 */
const TrackingTimeline = ({ statusHistory = [] }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <CheckCircle className="text-green-600" size={24} />;
            case 'In Transit':
                return <Truck className="text-blue-600" size={24} />;
            case 'Pending Approval':
                return <Clock className="text-amber-600" size={24} />;
            case 'Cancelled':
                return <XCircle className="text-red-600" size={24} />;
            default:
                return <Package className="text-slate-600" size={24} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 border-green-300';
            case 'In Transit':
                return 'bg-blue-100 border-blue-300';
            case 'Pending Approval':
                return 'bg-amber-100 border-amber-300';
            case 'Cancelled':
                return 'bg-red-100 border-red-300';
            default:
                return 'bg-slate-100 border-slate-300';
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!statusHistory || statusHistory.length === 0) {
        return (
            <div className="text-center text-slate-500 py-8">
                No tracking history available
            </div>
        );
    }

    return (
        <div className="tracking-timeline">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Tracking Timeline</h3>
            <div className="space-y-4">
                {statusHistory.map((entry, index) => {
                    const isLast = index === statusHistory.length - 1;

                    return (
                        <div key={index} className="flex gap-4">
                            {/* Timeline Line */}
                            <div className="flex flex-col items-center">
                                <div className={`p-2 rounded-full border-2 ${getStatusColor(entry.status)}`}>
                                    {getStatusIcon(entry.status)}
                                </div>
                                {!isLast && (
                                    <div className="w-0.5 h-full bg-slate-200 mt-2" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-8">
                                <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900">{entry.status}</h4>
                                            {entry.note && (
                                                <p className="text-sm text-slate-600 mt-1">{entry.note}</p>
                                            )}
                                        </div>
                                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                                            {formatTimestamp(entry.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrackingTimeline;
