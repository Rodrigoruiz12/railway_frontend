// src/components/2-molecules/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Heading from '../atoms/Heading';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';
// --- CAMBIO 1: Importamos tu función 'money' (asumiendo que está en 'utils/formatPrice.js') ---
import { money } from '../../utils/formatPrice';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <Image src={product.image} alt={product.name} className="product-card-image" />
        <Heading level={3}>{product.name}</Heading>
      </Link>
      
      {/* --- CAMBIO 2: Usamos tu función 'money' en lugar de .toFixed(2) --- */}
      <Text className="product-card-price">{money(product.price)}</Text>
      
      <Button variant="primary" onClick={() => addToCart(product)}>
        Añadir al Carrito
      </Button>
    </div>
  );
};

export default ProductCard;