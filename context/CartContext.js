import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload) };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const initialState = { cartItems: [] };
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };

