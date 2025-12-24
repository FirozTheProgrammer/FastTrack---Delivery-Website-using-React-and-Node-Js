import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';

const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Handle non-200 responses (e.g., 404, 500)
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message.' });
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus({ type: 'error', message: error.message || 'An error occurred. Please ensure the server is running.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen pt-24 pb-12 px-4 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Have questions about our services? We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="flex flex-col gap-8">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Our Office</h3>
                                            <p className="text-slate-600 dark:text-slate-300">
                                                123 Fast Track Lane<br />
                                                Dhaka, Bangladesh 1200
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Phone</h3>
                                            <p className="text-slate-600 dark:text-slate-300">+880 1234-567890</p>
                                            <p className="text-slate-500 text-sm mt-1">Mon-Fri from 9am to 6pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Email</h3>
                                            <p className="text-slate-600 dark:text-slate-300">support@fasttrack.com</p>
                                            <p className="text-slate-500 text-sm mt-1">We'll respond within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-900 p-8 rounded-3xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 p-10 -ml-6 -mb-6 bg-primary-500/20 rounded-full blur-xl"></div>
                                <h3 className="text-xl font-semibold mb-4 relative z-10">Need specialized delivery?</h3>
                                <p className="text-indigo-100 mb-6 relative z-10">
                                    For bulk orders or special handling requirements, please contact our business support team directly.
                                </p>
                                <Button variant="secondary" className="w-full sm:w-auto relative z-10">Contact Sales</Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Send us a Message</h2>

                            {status.message && (
                                <div className={`p-4 rounded-xl mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                    ></textarea>
                                </div>

                                <Button variant="primary" type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
                                    {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
