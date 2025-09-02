import React from "react";
import './ProductCard.css'
import { useState, useEffect } from "react";
import axios from "axios";

function ProductCard() {
  const [resProducts, setResProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://assignment-17-1.onrender.com/api/products")
      .then((res) => {
        setResProducts(res.data); // res.data is the array
        setLoading(false);
      })
      .catch((err) => console.log(err))
  }, []);
  console.log(resProducts);
  

  return (
    <div>
        {
          loading ? ((
  Array(10)
    .fill(0)
    .map((_, i) => (
      <div className="skeleton" key={i}>
        <div className="image-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="buttons">
          <div className="btns"></div>
          <div className="btns"></div>
        </div>
      </div>
    ))
)) : <div>
            <div className="product-container">
              {
                resProducts.map((product, index) => (
                  <div key={index} className="product-card"> {/* Added key prop */}
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h2 className="product-name">{product.name}</h2>
                    <hr />
                    <p className="product-description">
                      {product.description}
                    </p>
                    <h3 className="price">Price: {product.price}</h3>
                    <p className="stocks-left">Stocks Left <span className="stock">{product.rating.count}</span> </p>
                    <p className="rating">rating <span className="rate">{product.rating.rate}</span> </p>
                    <div className="buttons">
                      <button className="buy-button">BUY</button>
                      <button className="cart-button">SAVE</button>
                    </div>
                  </div>

                ))
              }
            </div>
        </div>
        }
    </div>
  );
}

export default ProductCard;