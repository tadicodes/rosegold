import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart">
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <span>{cartItems.length} items</span>
            </div>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="cart-item-details">
                            <h3 className="cart-item-title">{item.name}</h3>
                            <p className="cart-item-price">${item.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                Total: ${getTotalPrice().toFixed(2)}
            </div>
            <div className="cart-buttons">
                <button>Checkout</button>
                <button>Continue Shopping</button>
            </div>
        </div>
    );
};

export default Cart;

