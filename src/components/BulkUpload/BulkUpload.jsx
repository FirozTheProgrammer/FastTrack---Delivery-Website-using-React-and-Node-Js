import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, XCircle, Loader } from 'lucide-react';

/**
 * BulkUpload Component
 * Allows admins to upload multiple orders via CSV or Excel files
 */
const BulkUpload = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        setUploading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/api/parcels/bulk', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setResult(data);

            if (data.success && onUploadComplete) {
                onUploadComplete(data);
            }
        } catch (error) {
            setResult({
                success: false,
                message: 'Upload failed: ' + error.message
            });
        } finally {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        // Download the sample CSV template
        window.location.href = '/sample-bulk-upload.csv';
    };

    return (
        <div className="bulk-upload-container">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Bulk Order Upload</h2>
                        <p className="text-slate-600 mt-1">Upload multiple orders at once using CSV or Excel</p>
                    </div>
                    <button
                        onClick={downloadTemplate}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
                    >
                        <Download size={18} />
                        Download Template
                    </button>
                </div>

                {/* Drag and Drop Area */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-300 bg-slate-50'
                        }`}
                >
                    <Upload className="mx-auto mb-4 text-slate-400" size={48} />
                    {file ? (
                        <div className="flex items-center justify-center gap-3">
                            <FileText className="text-primary-600" size={24} />
                            <span className="font-medium text-slate-900">{file.name}</span>
                            <button
                                onClick={() => setFile(null)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-slate-600 mb-2">
                                Drag and drop your file here, or{' '}
                                <label className="text-primary-600 hover:text-primary-700 cursor-pointer font-medium">
                                    browse
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".csv,.xlsx,.xls"
                                        className="hidden"
                                    />
                                </label>
                            </p>
                            <p className="text-sm text-slate-500">Supports CSV and Excel files (max 5MB)</p>
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                {file && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-full font-medium transition-colors"
                        >
                            {uploading ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={20} />
                                    Upload Orders
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className={`mt-6 p-6 rounded-xl ${result.success
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}>
                        <div className="flex items-start gap-3">
                            {result.success ? (
                                <CheckCircle className="text-green-600 mt-1" size={24} />
                            ) : (
                                <XCircle className="text-red-600 mt-1" size={24} />
                            )}
                            <div className="flex-1">
                                <h3 className={`font-bold mb-2 ${result.success ? 'text-green-900' : 'text-red-900'
                                    }`}>
                                    {result.message}
                                </h3>

                                {result.success && (
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-slate-900">{result.totalProcessed}</div>
                                            <div className="text-sm text-slate-600">Total Processed</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-green-600">{result.successCount}</div>
                                            <div className="text-sm text-slate-600">Successful</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-red-600">{result.errorCount}</div>
                                            <div className="text-sm text-slate-600">Failed</div>
                                        </div>
                                    </div>
                                )}

                                {result.errors && result.errors.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-red-900 mb-2">Errors:</h4>
                                        <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                                            {result.errors.map((error, idx) => (
                                                <div key={idx} className="text-sm text-red-700 mb-1">
                                                    Row {error.row}: {error.error}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkUpload;
