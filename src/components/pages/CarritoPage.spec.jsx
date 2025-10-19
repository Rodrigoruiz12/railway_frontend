// src/components/pages/CarritoPage.spec.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import CarritoPage from './CarritoPage.jsx';
import { CartContext } from '../../context/CartContext.jsx';
// --- CAMBIO 1: Importar el AuthContext ---
import { AuthContext } from '../../context/AuthContext.jsx';

// --- CAMBIO 2: Actualizar la función renderCart ---
const renderCart = (cartValue) => {
    // Agregamos un valor simulado para el AuthContext
    const authContextValue = { user: null, logout: vi.fn() }; 

    return render(
        <BrowserRouter>
            {/* Envolvemos todo con el AuthContext que faltaba */}
            <AuthContext.Provider value={authContextValue}>
                <CartContext.Provider value={cartValue}>
                    <CarritoPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente CarritoPage', () => {

    // --- Prueba 10: Renderizado Condicional y Contexto ---
    it('debería mostrar "Tu carrito está vacío" si el contexto no tiene items', () => {
        // 1. PREPARAR: Simulamos un contexto con un carrito vacío
        const emptyCart = {
            cart: [],
            removeFromCart: vi.fn()
        };
        
        renderCart(emptyCart);

        // 3. VERIFICAR: Comprobamos que el mensaje de vacío aparezca
        expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
        expect(screen.getByText('Ver productos')).toBeInTheDocument();
    });
});