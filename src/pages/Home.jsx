import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, Globe, Package, CheckCircle } from 'lucide-react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TrackingResult from '../components/TrackingResult/TrackingResult';
import Stats from '../components/Stats/Stats';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';


const Home = () => {
    const [trackingId, setTrackingId] = useState('');
    const [phone, setPhone] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingId || !phone) {
            setError('Please enter both Tracking ID and Phone Number');
            return;
        }

        setIsSearching(true);
        setError('');
        setTrackingResult(null);

        try {
            const response = await fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: trackingId, phone })
            });

            const data = await response.json();

            if (data.success) {
                setTrackingResult(data.parcel);
            } else {
                setError(data.message || 'Tracking failed');
            }
        } catch (err) {
            setError('Unable to track parcel. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const features = [
        { icon: Zap, title: "Super Fast Delivery", desc: "Same day delivery within Dhaka city and 24h nationwide." },
        { icon: Shield, title: "Secure Handling", desc: "Your parcels are insured and handled with extreme care." },
        { icon: Globe, title: "Nationwide Coverage", desc: "We reach over 64 districts in Bangladesh with our vast network." },
        { icon: Package, title: "Real-time Tracking", desc: "Know exactly where your package is at every step." },
    ];

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white -z-10" />
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-primary-100/20 blur-3xl -z-10 rounded-full transform translate-x-1/4" />

                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6"
                                >
                                    Running everywhere in Bangladesh 🇧🇩
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
                                >
                                    Fastest Delivery <br />
                                    <span className="text-primary-600">Trust</span> in Every Box.
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0"
                                >
                                    Send parcels anywhere in Bangladesh with speed, security, and real-time updates. Experience the next generation of logistics.
                                </motion.p>

                                {/* Tracking Form */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 max-w-md mx-auto lg:mx-0"
                                >
                                    <form onSubmit={handleTrack} className="flex flex-col gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <Input
                                                placeholder="Tracking ID"
                                                className="w-full pl-10 border-0 bg-slate-50 focus:bg-white mb-2"
                                                value={trackingId}
                                                onChange={(e) => setTrackingId(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder="Sender Phone Number"
                                                className="w-full pl-4 border-0 bg-slate-50 focus:bg-white"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isSearching} className="w-full">
                                            {isSearching ? 'Locating...' : 'Track Now'}
                                        </Button>
                                    </form>
                                </motion.div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* Tracking Result Modal/Card */}
                                {trackingResult && (
                                    <div className="mt-8">
                                        <TrackingResult parcel={trackingResult} onClose={() => setTrackingResult(null)} />
                                    </div>
                                )}
                            </div>

                            {/* Hero Image */}
                            <div className="lg:w-1/2 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative z-10"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1566576912906-25434543d72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                                        alt="Delivery Driver"
                                        className="rounded-3xl shadow-2xl"
                                    />
                                    {/* Floating Elements */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                        className="absolute -top-10 -right-10 bg-white p-4 rounded-xl shadow-lg hidden md:block"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                <CheckCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">Delivered</p>
                                                <p className="text-xs text-slate-500">Just now</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <Stats />

                {/* Features Section */}
                <section id="services" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Fast Track?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">We don't just deliver packages; we deliver promises. Our service is designed to give you peace of mind.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Testimonials />

                <FAQ />

                {/* CTA Section */}
                <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to send your first parcel?</h2>
                        <p className="text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of happy customers who trust Fast Track for their daily logistical needs.</p>
                        <Button variant="primary" className="mx-auto text-lg px-8 py-4">Create Account</Button>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    );
};

export default Home;
