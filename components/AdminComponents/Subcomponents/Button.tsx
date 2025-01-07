"use client";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../app/Redux/Cartslice";
import { RootState } from "../../../app/Redux/Store";
import { ITopic } from "../../../backend/models/topics";

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

	const handleAddToCart = (product: ITopic) => {
		const productWithConvertedPrice: CartItem = {
			_id: product._id,
			title: product.title,
			price: typeof product.price === "number" ? product.price : parseFloat(product.price),
			imageFileUrl: product.imageFileUrl,
		};
		dispatch(addToCart(productWithConvertedPrice));
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
				<button  onClick={() => handleAddToCart(product)}>
					Dodaj do koszyka
				</button>
			)}
		</>
	);
};
