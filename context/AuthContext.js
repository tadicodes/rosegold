import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { ...state, token: null, isAuthenticated: false };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const initialState = { token: localStorage.getItem('token'), isAuthenticated: null, user: null };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider value={{ ...state, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

