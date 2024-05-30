import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products');
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1>Products</h1>
            <div className="products">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-title">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

