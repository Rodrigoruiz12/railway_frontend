// src/components/pages/LoginPage.spec.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

import LoginPage from './LoginPage.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
// --- CAMBIO 1: Importar el CartContext ---
import { CartContext } from '../../context/CartContext.jsx'; 

// Mock simple de la API
vi.mock('../../api/db.js', () => ({
  loginUser: vi.fn(),
}));

// --- CAMBIO 2: Actualizar la función renderLoginPage ---
const renderLoginPage = () => {
    const loginSpy = vi.fn();
    // Agregamos un valor simulado para el CartContext
    const cartContextValue = { cart: [] }; 

    return render(
        <BrowserRouter>
            <AuthContext.Provider value={{ login: loginSpy }}>
                {/* Envolvemos la página con el CartContext que faltaba */}
                <CartContext.Provider value={cartContextValue}>
                    <LoginPage />
                </CartContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Componente LoginPage', () => {

    // --- Prueba 8: Estado (Manejo de inputs) ---
    it('debería actualizar el estado al escribir en los inputs', () => {
        renderLoginPage();
        
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Contraseña');

        fireEvent.change(emailInput, { target: { value: 'test@user.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pass123' } });

        expect(emailInput.value).toBe('test@user.com');
        expect(passwordInput.value).toBe('pass123');
    });

    // --- Prueba 9: Renderizado Condicional (Error) ---
    it('debería mostrar un enlace para registrarse', () => {
        renderLoginPage();

        const registerLink = screen.getByText('Regístrate aquí');
        
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.tagName).toBe('A');
    });
});