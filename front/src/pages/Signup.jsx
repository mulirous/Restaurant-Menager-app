import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    return (
        <div style={styles.container}>
            <h2>Faça seu Cadastro</h2>
            <SignupForm />
        </div>
    );
}

function SignupForm() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}/users/signup`

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch( url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })

            if (response.ok) {
                navigate('/home');
            } else {
                const data = await response.json();
                console.error('Signup failed:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <input
                style={styles.formInput}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu Nome"
                required
            />
            <input
                style={styles.formInput}
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu Email"
                required
            />
            <input
                style={styles.formInput}
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua Senha"
                required
            />
            <PasswordVerify password={password} />
        </form>
    );
}

function PasswordVerify({ password }) {
    if (password.length <= 6) {
        return <span>Sua senha deve conter mais de 6 caracteres</span>;
    }
    return <button type="submit" style={styles.button}>Signup</button>;
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formInput: {
        padding: '10px',
        margin: '10px',
        width: '100%',
        boxSizing: 'border-box',
        borederRadius: '8px'
    },
    button: {
        padding: '10px 20px',
        margin: '0 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Signup;
