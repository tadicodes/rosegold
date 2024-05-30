import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

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
        <div>
            <h1>Your Orders</h1>
            <div>
                {orders.map(order => (
                    <div key={order._id}>
                        <h2>Order ID: {order._id}</h2>
                        <p>Total Amount: {order.totalAmount}</p>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;

