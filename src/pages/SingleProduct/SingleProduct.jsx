import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SingleProduct = () => {
  const { user } = useSelector((state) => state.auth)
  const { products } = useSelector((state) => state.home);
  const { product_id } = useParams();
  const navigate = useNavigate();
  const productIdNumber = parseInt(product_id);
  const { title, price, category, description, image } = products.find((product) => product.id === productIdNumber);


  const addToCart = () => {

    if (!user) {
      // If there is no authenticated user, redirect to the login page
      navigate("/login");
    } else {
      console.log("Add to cart")
    }
  }
  return (
    <div style={{ marginTop: "15vh" }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%', textAlign: "center" }}>
          <img src={image} alt={title} style={{ width: '50%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <div>
            <h2>{title}</h2>
            <p>Category: {category}</p>
            <p>Price: ${price}</p>
            <Button onClick={addToCart}>Add to Cart</Button>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
