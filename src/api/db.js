// src/api/db.js

// Tus nuevos productos ¡se mantienen!
const products = [
    { id: 1, name: "Control Xbox", price: 59000, image: "/img/xbox.webp", description: "Control inalámbrico de Xbox con diseño ergonómico y vibración háptica." },
    { id: 2, name: "Auriculares Logitech", price: 60000, image: "/img/logi.jpeg", description: "Auriculares Logitech con micrófono incorporado y sonido envolvente." },
    { id: 3, name: "Escritorio Cougar", price: 150000, image: "/img/cougar.avif", description: "Escritorio gamer Cougar con superficie amplia y soporte para accesorios." },
    { id: 4, name: "Teclado HyperX", price: 49990, image: "/img/teclado.jpg", description: "Teclado mecánico HyperX con retroiluminación RGB y switches precisos." },
    { id: 5, name: "Mouse Glorious", price: 24990, image: "/img/glorious.jpg", description: "Mouse Glorious ultraligero con sensor de alta precisión y diseño perforado." },
    { id: 6, name: "Monitor 24\"", price: 159990, image: "/img/monitor.jpg", description: "Monitor de 24 pulgadas Full HD con alta tasa de refresco y bordes delgados." },
    { id: 7, name: "Silla Gamer", price: 89990, image: "/img/silla.jpg", description: "Silla gamer ergonómica con soporte lumbar y ajuste de altura reclinable." },
];

// ▼▼▼ FUNCIÓN DE MONEDA CORREGIDA (CON EXPORT) ▼▼▼
export function money(x) {
  return Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(x);
}

// ▼▼▼ ESTRUCTURA DE USUARIOS CORRECTA (CON TODOS LOS CAMPOS) ▼▼▼
let users = [
    { id: 1, email: 'roro@duoc.cl', password: 'admin', role: 'admin', fullName: 'Admin Roro', phone: 'N/A', region: 'N/A' },
    { id: 2, email: 'user@test.com', password: 'user123', role: 'user', fullName: 'Usuario Test', phone: '987654321', region: 'Los Lagos' },
];

// --- Product Functions ---
export const getProducts = () => new Promise(resolve => setTimeout(() => resolve(products), 200));
export const getProductById = (id) => new Promise(resolve => setTimeout(() => resolve(products.find(p => p.id === parseInt(id))), 200));

// --- Auth Functions ---
export const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                resolve({ id: user.id, email: user.email, role: user.role });
            } else {
                reject('Credenciales inválidas');
            }
        }, 500);
    });
};

// ▼▼▼ FUNCIÓN 'registerUser' CORRECTA (CON TODOS LOS CAMPOS) ▼▼▼
export const registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { email, password, fullName, phone, region } = userData;
            if (users.some(u => u.email === email)) {
                reject('El correo ya está registrado');
            } else {
                const newUser = {
                    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                    email,
                    password,
                    role: 'user',
                    fullName,
                    phone: phone || 'No especificado',
                    region,
                };
                users.push(newUser);
                resolve({ id: newUser.id, email: newUser.email, role: newUser.role });
            }
        }, 500);
    });
};

// --- Admin Functions ---
export const getUsers = () => new Promise(resolve => setTimeout(() => resolve(users), 200));

export const deleteUser = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users = users.filter(u => u.id !== userId);
            resolve(users);
        }, 300);
    });
};

// ▼▼▼ FUNCIÓN 'addUser' CORRECTA (CON TODOS LOS CAMPOS) ▼▼▼
export const addUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (users.some(u => u.email === email)) {
                reject('El correo ya existe');
            } else {
                const newUser = {
                    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                    email,
                    password,
                    role: 'user',
                    fullName: 'Nuevo Usuario',
                    phone: 'N/A',
                    region: 'N/A'
                };
                users.push(newUser);
                resolve(users);
            }
        }, 300);
    });
};