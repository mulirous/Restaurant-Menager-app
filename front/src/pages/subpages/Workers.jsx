import Layout from "../../layout/Layout"
import Table from "../../components/Table"
import React, { useState } from "react"

function Workers() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}/workers`

    const [showOption, setShowOption] = useState(false);
    const [data, setData] = useState({
        nome: "",
        cargo: "",
        salario: null,
    });

    const toggleAdd = () => setShowOption(!showOption);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: name === "salario" ? parseInt(value) || 0 : value,
        });
    };

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
                alert("Funcionário adicionado com sucesso!");
                location.reload();
            } else {
                alert("Erro ao adicionar Funcionário");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor");
        }
    };

    return (
        <Layout>
            <h3 className="costumer-title">Funcionários</h3>

            <button className="toggle-button" onClick={toggleAdd}>
                {showOption ? "Esconder Opções" : "Mostrar Opções"}
            </button>

            {showOption &&
            <div className="add-option" style={styles.container}>
                    <h4>Adicionar Funcionário</h4>
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
                            name="cargo"
                            placeholder="Cargo"
                            value={data.cargo}
                            onChange={handleInput}
                            className="input-field"
                            style={styles.input_field}
                            required
                        />
                        <input
                            type="text"
                            name="salario"
                            placeholder="Salário"
                            value={data.salario}
                            onChange={handleInput}
                            className="input-field"
                            style={styles.input_field}
                            required
                        />
                        <button type="submit" className="submit-button" style={styles.btn}>Adicionar Funcionário</button>
                    </form>
                </div>
            }
            <Table apiUrl={ url } />
        </Layout>
    );
}

const styles = {
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

export default Workers;
