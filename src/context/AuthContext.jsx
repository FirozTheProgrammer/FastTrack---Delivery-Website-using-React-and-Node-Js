import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Manages the global authentication state for the application.
 * provides 'user', 'login', and 'logout' to all children components.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from local storage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('fastTrackUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    /**
     * Logs a user in by updating state and saving to localStorage.
     * @param {Object} userData - User details (username, role).
     */
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('fastTrackUser', JSON.stringify(userData));
    };

    /**
     * Logs the user out by clearing state and removing from localStorage.
     */
    const logout = () => {
        setUser(null);
        localStorage.removeItem('fastTrackUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
