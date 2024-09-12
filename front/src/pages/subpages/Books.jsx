import React, { useState, useEffect } from "react"
import Table from "../../components/Table"
import Layout from "../../layout/Layout"

function Books() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}`
    const [showOption, setShowOption] = useState(false);
    const [costumers, setCostumers] = useState([]);
    const [data, setData] = useState({
        cliente_id: "",
        data_reserva: "",
        hora_reserva: "",
        num_pessoas: null,
    });

    useEffect(() => {
        const fetchCostumers =  async () => {
            try {
                const response = await fetch (`${url}/costumers`);
                const result = await response.json();
                setCostumers(result);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchCostumers();
    }, []);

    const toggleAdd = () => setShowOption(!showOption);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const verificarReservaExistente = async () => {
        try {
            const response = await fetch(`${url}/booking/check?data_reserva=${data.data_reserva}&horario_reserva=${data.horario_reserva}`);
            const result = await response.json();
            return result.exists;
        } catch (error) {
            console.error("Erro ao verificar reserva:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservaExistente = await verificarReservaExistente();
        
        if (reservaExistente) {
            alert("Já existe uma reserva para essa data e horário.");
            return;
        }
        try {
            const response = await fetch(`${url}/booking`, {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert("Reserva adicionada com sucesso!");
                location.reload();
            } else {
                alert("Erro ao adicionar reserva.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
        }
    };
    

    return (
        <Layout>
            <h3 className="costumer-title">Reservas</h3>

            <button className="toggle-button" onClick={toggleAdd}>
                {showOption ? "Esconder Opções" : "Mostrar Opções"}
            </button>

            {showOption &&
            <div className="add-option" style={styles.container}>
                <h4>Adicionar Reserva</h4>
                <form onSubmit={handleSubmit}>
                    <select
                        name="cliente_id"
                        value={data.cliente_id}
                        onChange={handleInput}
                        required
                        className="input-field"
                        style={styles.input_field}
                    >
                        <option value="">Selecione um Cliente</option>
                        {costumers.map(costumer => (
                            <option key={costumer.id} value={costumer.id}>
                                {costumer.nome}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="data_reserva"
                        value={data.data_reserva}
                        onChange={handleInput}
                        className="input-field"
                        style={styles.input_field}
                        required
                    />
                    <input
                        type="time"
                        name="hora_reserva"
                        value={data.hora_reserva}
                        onChange={handleInput}
                        className="input-field"
                        style={styles.input_field}
                        required
                    />
                    <input
                        type="number"
                        name="num_pessoas"
                        value={data.num_pessoas}
                        onChange={handleInput}
                        className="input-field"
                        style={styles.input_field}
                        required
                        placeholder="Número de pessoas"
                    />

                    <button type="submit" className="submit-button" style={styles.btn}>
                        Adicionar Reserva
                    </button>
                </form>
            </div>
            }
            <Table apiUrl={ `${url}/booking` } />
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
        marginTop: "10px", 
    }
}

export default Books;