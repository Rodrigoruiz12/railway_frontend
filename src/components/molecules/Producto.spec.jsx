// src/components/molecules/ProductCard.spec.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import ProductCard from './Producto.jsx';
import { CartContext } from '../../context/CartContext.jsx';

// Creamos un producto de prueba
const mockProduct = {
    id: 1,
    name: 'Roro Viper Ultimate',
    price: 79.99,
    image: 'https://via.placeholder.com/400x300.png?text=Roro+Viper'
};

// Función auxiliar para renderizar el componente con sus proveedores
const renderWithProviders = (addToCartSpy) => {
    return render(
        <BrowserRouter>
            <CartContext.Provider value={{ addToCart: addToCartSpy }}>
                <ProductCard product={mockProduct} />
            </CartContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente ProductCard', () => {

    // --- Prueba 6: Renderizado y Props ---
    it('debería renderizar la información del producto (props)', () => {
        const spy = vi.fn();
        renderWithProviders(spy);

        // Verificamos que el nombre y el precio del mockProduct estén en pantalla
        expect(screen.getByText('Roro Viper Ultimate')).toBeInTheDocument();
        expect(screen.getByText('$80')).toBeInTheDocument();
    });

    // --- Prueba 7: Eventos y Contexto ---
    it('debería llamar a addToCart al hacer clic en el botón', () => {
        // 1. PREPARAR: Creamos un espía para la función del contexto
        const addToCartSpy = vi.fn();
        renderWithProviders(addToCartSpy);

        // 2. ACTUAR: Simulamos clic en el botón
        fireEvent.click(screen.getByText('Añadir al Carrito'));

        // 3. VERIFICAR: Comprobamos que el espía fue llamado con el producto correcto
        expect(addToCartSpy).toHaveBeenCalledWith(mockProduct);
    });
});