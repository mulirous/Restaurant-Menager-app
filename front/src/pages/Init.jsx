import { Link } from 'react-router-dom';

function Init() {
    return (
    <div style={styles.container}>
        <h1>Você está na home</h1>
        <h3>Escolha uma das opções</h3>
        <HomeCard style={styles.card} />
    </div>
    );
}

function HomeCard() {
    return (
    <div style={styles.buttonContainer} >
        <Link to="/login">
        <button style={styles.button} >
            Login
        </button>
        </Link>
        <Link to="/signup">
        <button style={styles.button} >
            Cadastro
        </button>
        </Link>
    </div>
    );
}

const styles = {
    container: {
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        height: '100vh',
        whidth: '100vh',
        borderColor: '#f0f0f0',
        borderRadius: '15px'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
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


export default Init;