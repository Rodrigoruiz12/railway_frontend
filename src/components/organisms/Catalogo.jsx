// src/components/organisms/Catalogo.jsx
import Producto from '../molecules/Producto';
import './Catalogo.css';

const Catalogo = ({ products }) => {
  return (
    <div className="catalogo">
      {products.map((product) => (
        <Producto key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Catalogo;