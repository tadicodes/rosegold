import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await axios.get('/api/orders', { headers: { 'x-auth-token': token } });
            setOrders(res.data);
        };
        fetchOrders();
    }, [token]);

    return (
        <div className="container">
            <h1>Your Orders</h1>
            <div className="orders">
                {orders.map(order => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <h2>Order ID: {order._id}</h2>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="order-details">
                            {order.items.map(item => (
                                <div key={item._id} className="order-item">
                                    <span>{item.name}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            Total: ${order.totalAmount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;

