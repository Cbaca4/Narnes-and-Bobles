import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Music.css'; // Import the CSS file

const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

const Music = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [cart, setCart] = useState([]);

  const handleButtonClick = (product) => {
    const updatedProducts = data.getAllProducts.map((p) => {
      if (p._id === product._id) {
        if (cart.includes(product)) {
          return { ...p, quantity: p.quantity + 1 };
        } else {
          return { ...p, quantity: p.quantity - 1 };
        }
      }
      return p;
    });

    setCart(cart.includes(product) ? cart.filter((item) => item !== product) : [...cart, product]);
    // Update the product quantities in the state or make a mutation call to update the quantities in the database
    // This is a placeholder logic and should be replaced with your actual implementation
    console.log(`Updated product quantities:`, updatedProducts);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product data: {error.message}</p>;

  return (
    <div>
      <h1>Music Page</h1>
      <div className="product-list">
        {data.getAllProducts.map((product) => (
          <div key={product._id} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => handleButtonClick(product)}>
              {cart.includes(product) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;