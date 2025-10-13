import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// Función auxiliar para leer el carrito del localStorage al cargar la página
const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        // Si hay un carrito guardado, lo devolvemos. Si no, un array vacío.
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error al leer el carrito del localStorage", error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    // El estado inicial del carrito se toma de lo que haya en localStorage.
    const [cart, setCart] = useState(getInitialCart);

    // Este efecto se ejecuta cada vez que el estado 'cart' cambia.
    useEffect(() => {
        try {
            // Guardamos el estado actual del carrito en localStorage.
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error("No se pudo guardar el carrito en el localStorage", error);
        }
    }, [cart]); // La dependencia es 'cart', así que se ejecuta cuando 'cart' cambia.

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Si el producto ya está, aumentamos la cantidad
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Si es un producto nuevo, lo agregamos al carrito con cantidad 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};