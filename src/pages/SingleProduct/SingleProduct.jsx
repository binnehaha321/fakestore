import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { updateProduct, updateProductFailed, updateProductSuccess } from '../../store/cart/cart.slice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)
  const { products } = useSelector((state) => state.home);
  const { product_id } = useParams();
  const navigate = useNavigate();
  const productIdNumber = parseInt(product_id);
  let newProduct = products.filter((product) => product.id === productIdNumber);
  const { image, title, category, price, description } = newProduct[0];
  const cartProducts = useSelector((state) => state.cart.products);
  const [quantity, setQuantity] = useState(1);


  const addToCart = (dispatch) => {
    if (!user) {
      navigate("/login");
    } else {
      const productToUpdate = cartProducts.find(product => product.id === productIdNumber);
      if (productToUpdate) {
        const updatedProducts = cartProducts.map(product => {
          if (product.id === productIdNumber) {
            return {
              ...product,
              quantity: product.quantity + quantity,
            };
          }
          return product;
        });
        dispatch(updateProduct())
        try {
          dispatch(updateProductSuccess(updatedProducts));
          localStorage.setItem("cart", JSON.stringify(updatedProducts))
          navigate(`/cart`);
        }
        catch (err) {
          dispatch(updateProductFailed(err));
        }


        // add new product
      } else {
        dispatch(updateProduct());
        try {
          const newProductData = {
            id: newProduct[0].id,
            title: newProduct[0].title,
            image: newProduct[0].image,
            category: newProduct[0].category,
            price: newProduct[0].price,
            description: newProduct[0].description,
            quantity: quantity,
          }
          const newCart = [...cartProducts, newProductData];
          console.log(newCart);
          dispatch(updateProductSuccess(newCart));
          localStorage.setItem("cart", JSON.stringify(newCart));
          navigate(`/cart`);
        }
        catch (err) {
          dispatch(updateProductFailed(err));
        }
      }
    }
  }

  const decrementQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
      return;
    }
    setQuantity(quantity - 1);

  }
  const incrementQuantity = () => {
    setQuantity(quantity + 1)
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

            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => decrementQuantity()}>-</Button>
              <p><span style={{ color: "blue", marginLeft: "1vw", marginRight: "1vw" }}>{quantity}</span></p>
              <Button onClick={() => incrementQuantity()}>+</Button>
            </div>
            <Button onClick={() => addToCart(dispatch)}>Add to Cart</Button>
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
