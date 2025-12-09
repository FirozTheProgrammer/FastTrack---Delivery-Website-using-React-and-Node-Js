import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Submits the login credentials to the backend.
     * If successful, updates the auth context and redirects to proper dashboard.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                login(data.user);
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Sign in to your account.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>

                        <Button type="submit" variant="primary" className="w-full py-3 mt-4">
                            Sign In
                        </Button>
                    </form>

                    <p className="text-center text-slate-500 dark:text-slate-400 mt-6 text-sm">
                        Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create Account</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Login;
