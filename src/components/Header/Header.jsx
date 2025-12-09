import React, { useState, useEffect } from 'react';
import { Package, Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../Button/Button';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
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
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
                    <Package size={32} />
                    <span>FastTrack</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Home</Link>
                    <Link to="/request" className="font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Request Delivery</Link>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {user ? (
                        <>
                            <Link to="/admin" className="font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">Admin Panel</Link>
                            <button onClick={logout} className="font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1">
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/register">
                            <Button variant="primary" className="py-2 px-4 text-sm">Get Started</Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-slate-700 dark:text-slate-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg p-4 flex flex-col gap-4 md:hidden border-t dark:border-slate-800">
                        <Link to="/" className="font-medium text-slate-700 dark:text-slate-200 py-2">Home</Link>
                        <Link to="/request" className="font-medium text-slate-700 dark:text-slate-200 py-2">Request Delivery</Link>

                        <div className="flex items-center justify-between py-2">
                            <span className="font-medium text-slate-700 dark:text-slate-200">Theme</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {user ? (
                            <>
                                <Link to="/admin" className="font-medium text-slate-700 dark:text-slate-200 py-2">Admin Panel</Link>
                                <button onClick={logout} className="text-left font-medium text-red-600 py-2">Logout</button>
                            </>
                        ) : (
                            <Link to="/register" className="w-full">
                                <Button variant="primary" className="w-full">Get Started</Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
