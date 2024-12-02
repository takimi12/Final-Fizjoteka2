'use client'
import { useDispatch, useSelector } from 'react-redux';
import cartReducer, { addToCart } from '../../../app/Redux/Cartslice';
import { RootState } from '../../../app/Redux/Store';

type Product = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  price: string;
  imageFileUrl: string;
  pdfFileUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CartItem = {
  _id: string;
  title: string;
  price: number;
  imageFileUrl: string;
};

type TopicsListProps = {
  product: Product;
};

const TopicsList: React.FC<TopicsListProps> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.cart); 
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    const productWithConvertedPrice: CartItem = {
      _id: product._id,
      title: product.title,
      price: parseFloat(product.price),
      imageFileUrl: product.imageFileUrl,
    };
    dispatch(addToCart(productWithConvertedPrice));
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item: CartItem) => item._id === productId);
  };

  return (
    <>
      {isProductInCart(product._id) ? (
        <button className="cursor-not-allowed" disabled>
          Już dodano
        </button>
      ) : (
        <button onClick={() => handleAddToCart(product)}>
          Dodaj do koszyka
        </button>
      )}
    </>
  );
};

export default TopicsList;
