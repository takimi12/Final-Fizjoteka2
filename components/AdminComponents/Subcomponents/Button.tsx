"use client";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../app/Redux/Cartslice";
import { RootState } from "../../../app/Redux/Store";
import { ITopic } from "../../../backend/models/topics";
import Popup from "../../PopUp/PopUp";


type CartItem = {
	_id: string;
	title: string;
	price: number;
	imageFileUrl: string;
};

type TopicsListProps = {
	product: ITopic;
};

export const Button: React.FC<TopicsListProps> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (product: ITopic) => {
    const productWithConvertedPrice: CartItem = {
      _id: product._id,
      title: product.title,
      price: typeof product.price === "number" ? product.price : parseFloat(product.price),
      imageFileUrl: product.imageFileUrl,
    };
    dispatch(addToCart(productWithConvertedPrice));
    setShowPopup(true);  // Show popup after adding to cart
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item: CartItem) => item._id === productId);
  };

  const disabledButtonStyle = {
	backgroundColor: "#d3d3d3", 
	color: "#a9a9a9", 
	cursor: "not-allowed", 
};


  return (
    <>
      {isProductInCart(product._id) ? (
        <button style={disabledButtonStyle} disabled>
          Już dodano
        </button>
      ) : (
        <button onClick={() => handleAddToCart(product)}>
          Dodaj do koszyka
        </button>
      )}
      {showPopup && <Popup onClose={closePopup} />}
    </>
  );
};
