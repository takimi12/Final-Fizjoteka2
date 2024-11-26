'use client'
import { useDispatch, useSelector } from 'react-redux';
import cartReducer, { addToCart } from '../../../app/Redux/Cartslice';
import { RootState } from '../../../app/Redux/Store';

// Definicja typu Product
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

// Definicja typu CartItem
type CartItem = {
  _id: string;
  title: string;
  price: number;
  imageFileUrl: string;
  // Dodaj inne właściwości, które są wymagane w stanie koszyka
};

// Definicja typu propsów dla TopicsList
type TopicsListProps = {
  product: Product;
};

// Komponent TopicsList
const TopicsList: React.FC<TopicsListProps> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.cart); // Użycie typu RootState
  const dispatch = useDispatch();

  // Funkcja obsługująca dodanie produktu do koszyka
  const handleAddToCart = (product: Product) => {
    // Konwersja price na number
    const productWithConvertedPrice: CartItem = {
      _id: product._id,
      title: product.title,
      price: parseFloat(product.price),
      imageFileUrl: product.imageFileUrl,
      // Dodaj inne właściwości, które są wymagane w stanie koszyka
    };
    dispatch(addToCart(productWithConvertedPrice));
  };

  // Funkcja sprawdzająca, czy produkt jest już w koszyku
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
