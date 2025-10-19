// src/components/organisms/Header.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import Button from '../atoms/Button';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="main-header">
            <Link to="/" className="logo">Perifericos.roro</Link>
            <nav className="main-nav">
                <Link to="/">Inicio</Link>
                <Link to="/products">Productos</Link>
                <Link to="/blog">Blog</Link> 
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
            </nav>
            <div className="header-actions">
                <Link to="/cart" className="cart-link">
                    🛒 Carrito ({cartItemCount})
                </Link>
                {user ? (
                    <div className="user-info">
                        <span>{user.email}</span>
                        <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
                    </div>
                ) : (
                    <div className="login-actions">
                         <Link to="/login">Iniciar Sesión</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;