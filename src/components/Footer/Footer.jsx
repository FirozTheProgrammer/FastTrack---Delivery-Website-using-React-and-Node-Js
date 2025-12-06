import React from 'react';
import { Package, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                            <Package size={32} />
                            <span>FastTrack</span>
                        </div>
                        <p className="text-slate-400">
                            Reliable, fast, and secure delivery services across Bangladesh. Your trust, our priority.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Express Delivery</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">E-commerce</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Corporate Logistics</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">International Shipping</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li>123 Tejgaon Industrial Area</li>
                            <li>Dhaka, Bangladesh</li>
                            <li>support@fasttrack.bd</li>
                            <li>+880 1712 345 678</li>
                        </ul>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Fast Track Delivery Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
