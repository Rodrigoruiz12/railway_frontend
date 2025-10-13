// src/components/pages/RegisterPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import { registerUser } from '../../api/db';
import { AuthContext } from '../../context/AuthContext';
import Label from '../atoms/Label';

// Lista simplificada solo con las regiones de Chile
const regionesDeChile = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
  "Valparaíso", "Metropolitana de Santiago", "Libertador General Bernardo O'Higgins",
  "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo", "Magallanes y de la Antártica Chilena"
];

const RegisterPage = () => {
    // Estados para los campos del formulario (sin comuna)
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Enviamos los datos sin la comuna
            const userData = { fullName, email, password, phone, region };
            const sessionData = await registerUser(userData);
            login(sessionData);
            navigate('/products');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <MainLayout>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Heading level={1} style={{ textAlign: 'center' }}>Registro de usuario</Heading>
                
                <FormField label="NOMBRE COMPLETO" id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
                <FormField label="CORREO" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <FormField label="CONTRASEÑA" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <FormField label="CONFIRMAR CONTRASEÑA" id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <FormField label="TELÉFONO (opcional)" id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                
                {/* Menú Desplegable de Región (simplificado) */}
                <div style={{ marginBottom: '15px' }}>
                    <Label htmlFor="region">Seleccione la región</Label>
                    <select id="region" value={region} onChange={e => setRegion(e.target.value)} required className="input-field" style={{ width: '100%' }}>
                        <option value="" disabled>-- Seleccione una región --</option>
                        {regionesDeChile.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

            

                {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
                
                <Button type="submit" style={{ width: '100%', marginTop: '10px' }}>REGISTRAR</Button>

                <Text style={{ textAlign: 'center', marginTop: '15px' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#007bff' }}>Inicia sesión aquí</Link>
                </Text>
            </form>
        </MainLayout>
    );
};

export default RegisterPage;