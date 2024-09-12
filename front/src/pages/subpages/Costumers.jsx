import Layout from "../../layout/Layout"
import Table from "../../components/Table"
import React, { useState } from "react"

function Costumers() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}/costumers`
    const [showOption, setShowOption] = useState(false);
    const [data, setData] = useState({
        nome: "",
        email: "",
        telefone: "",
    });

    const toggleAdd = () => setShowOption(!showOption);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch( url, {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Cliente adicionado com sucesso!");
                location.reload();
            } else {
                alert("Erro ao adicionar Cliente");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor");
        }
    }
    

    return (
        <Layout>
            <h3 className="costumer-title">Clientes</h3>

            <button className="toggle-button" onClick={toggleAdd}>
                {showOption ? "Esconder Opções" : "Mostrar Opções"}
            </button>

            {showOption &&
            <div className="add-option" style={styles.container}>
                    <h4>Adicionar Cliente</h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={data.nome}
                            onChange={handleInput}
                            className="input-field"
                            style={styles.input_field}
                            required
                        />
                        <input
                            type="text"
                            name="telefone"
                            placeholder="DDD Celular"
                            value={data.telefone}
                            onChange={handleInput}
                            className="input-field"
                            style={styles.input_field}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleInput}
                            className="input-field"
                            style={styles.input_field}
                            required
                        />
                        <button type="submit" className="submit-button" style={styles.btn}>Adicionar Cliente</button>
                    </form>
                </div>
            }
            <Table apiUrl={ url } />
        </Layout>
    );
}

const styles = {
    input_field: {
        marginRight: "10px"
    },
    container: {
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        textAlign: "center"
    },
    btn: {
        marginTop: "10px" 
    }
}

export default Costumers;