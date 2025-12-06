import React, { useState, useEffect } from 'react';
import { Package, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
                    <Package size={32} />
                    <span>FastTrack</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="font-medium text-slate-700 hover:text-primary-600 transition-colors">Home</Link>
                    <Link to="/request" className="font-medium text-slate-700 hover:text-primary-600 transition-colors">Request Delivery</Link>
                    <Link to="/admin" className="font-medium text-slate-700 hover:text-primary-600 transition-colors">Admin Panel</Link>
                    <Button variant="primary" className="py-2 px-4 text-sm">Get Started</Button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden">
                        <Link to="/" className="font-medium text-slate-700 py-2">Home</Link>
                        <Link to="/request" className="font-medium text-slate-700 py-2">Request Delivery</Link>
                        <Link to="/admin" className="font-medium text-slate-700 py-2">Admin Panel</Link>
                        <Button variant="primary" className="w-full">Get Started</Button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
