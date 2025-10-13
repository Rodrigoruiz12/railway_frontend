import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Función auxiliar para leer el usuario del localStorage
const getInitialUser = () => {
    try {
        const storedUser = localStorage.getItem('user');
        // Si hay un usuario guardado en localStorage, lo devolvemos. Si no, null.
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error al leer el usuario del localStorage", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    // Al iniciar, el estado del usuario se toma de lo que haya en localStorage.
    const [user, setUser] = useState(getInitialUser);

    // Este efecto se ejecuta cada vez que el estado 'user' cambia.
    useEffect(() => {
        try {
            if (user) {
                // Si el usuario existe (es decir, se ha logueado), lo guardamos en localStorage.
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                // Si el usuario es null (es decir, ha hecho logout), lo eliminamos de localStorage.
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error("No se pudo guardar el usuario en el localStorage", error);
        }
    }, [user]); // La dependencia es 'user', así que se ejecuta cuando 'user' cambia.

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};