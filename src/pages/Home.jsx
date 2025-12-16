import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Clock, Shield, MapPin, CheckCircle, Truck } from 'lucide-react';
import Header from '../components/Header/Header';
import Stats from '../components/Stats/Stats';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

const Home = () => {
    const [trackingId, setTrackingId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = (e) => {
        e.preventDefault();
        setError('');

        if (!trackingId.trim()) {
            setError('Please enter a tracking number');
            return;
        }

        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            setIsSearching(false);
            console.log('Tracking:', trackingId);
        }, 1500);
    };

    const features = [
        {
            icon: Package,
            title: "Real-Time Tracking",
            desc: "Monitor your shipment's journey with live GPS updates and instant status notifications."
        },
        {
            icon: Shield,
            title: "Secure Handling",
            desc: "Your parcels are handled with utmost care and insured against damage or loss."
        },
        {
            icon: Clock,
            title: "Express Delivery",
            desc: "Same-day and next-day delivery options to meet your urgent deadlines."
        },
        {
            icon: MapPin,
            title: "Nationwide Coverage",
            desc: "Reaching every corner of Bangladesh with our extensive logistics network."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 overflow-x-hidden">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden dark:bg-slate-900 transition-colors duration-300">
                    {/* Floating Orbs Animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute top-20 left-1/4 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl mix-blend-screen"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                            className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen"
                        />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2 text-center lg:text-left z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                        Delivery Solutions for the <span className="text-primary-600 dark:text-primary-500">Modern World</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                                        Fast, reliable, and secure courier services tailored to your needs. Experience the future of logistics with Fast Track.
                                    </p>

                                    {/* Tracking Form */}
                                    <div className="bg-white dark:bg-slate-800 p-2 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-md mx-auto lg:mx-0 mb-8">
                                        <form onSubmit={handleTrack} className="flex flex-col gap-2">
                                            <div className="relative flex-1">
                                                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Enter Tracking ID"
                                                    className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 border-none outline-none focus:ring-0"
                                                    value={trackingId}
                                                    onChange={(e) => setTrackingId(e.target.value)}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                className="w-full sm:w-auto rounded-xl"
                                                disabled={isSearching}
                                            >
                                                {isSearching ? 'Locating...' : 'Track Now'}
                                            </Button>
                                        </form>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <Link to="/register" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group">
                                            Get Started
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link to="/services" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center">
                                            Our Services
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="relative z-10 w-full max-w-lg mx-auto">
                                    <motion.img
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                        alt="Delivery Courier"
                                        className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4"
                                    >
                                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                                            <CheckCircle size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Status</p>
                                            <p className="text-slate-900 dark:text-white font-bold">Delivered on Time</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Stats />

                {/* Features Section */}
                <section id="services" className="relative pt-20 pb-32 bg-white dark:bg-slate-900 transition-colors duration-300">
                    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[99%] pointer-events-none">
                        <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,50 Q600,-10 1200,50 V120 H0 Z" className="fill-primary-500 opacity-5 dark:opacity-10"></path>
                            <path d="M0,60 Q600,0 1200,60 V120 H0 Z" className="fill-white dark:fill-slate-900"></path>
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
                            >
                                Why Choose Fast Track?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                            >
                                We don't just deliver packages; we deliver promises. Our service is designed to give you peace of mind.
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="feature-card p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Testimonials />
                <FAQ />

                {/* CTA Section */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Ready to Ship?</h2>
                            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
                                Join thousands of satisfied customers who trust Fast Track for their delivery needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lg hover:shadow-primary-600/30 transition-all flex items-center justify-center gap-2 text-lg">
                                    Create Free Account
                                    <ArrowRight size={20} />
                                </Link>
                                <Link to="/contact" className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold transition-all text-lg shadow-sm">
                                    Contact Sales
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
