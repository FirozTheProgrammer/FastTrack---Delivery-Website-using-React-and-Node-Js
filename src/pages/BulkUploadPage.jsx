import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BulkUpload from '../components/BulkUpload/BulkUpload';

/**
 * Bulk Upload Page
 * Wrapper page for the bulk upload component
 */
const BulkUploadPage = () => {
    const navigate = useNavigate();

    const handleUploadComplete = (result) => {
        if (result.success) {
            // Optionally navigate back to admin dashboard after successful upload
            setTimeout(() => {
                if (confirm(`Upload complete! ${result.successCount} orders created. Go to Admin Dashboard?`)) {
                    navigate('/admin');
                }
            }, 1000);
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <BulkUpload onUploadComplete={handleUploadComplete} />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default BulkUploadPage;
