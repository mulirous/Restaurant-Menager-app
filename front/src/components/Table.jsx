import React, { useState, useEffect } from 'react';
import './styles/table.css';

function Table({ apiUrl }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError('Erro ao carregar os dados.');
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [apiUrl]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Função para renderizar campos aninhados de um objeto
    const renderCell = (key, value) => {
        // Se o valor for um objeto (como Cliente), exibe apenas o nome ou outro campo desejado
        if (typeof value === 'object' && value !== null) {
        if (key === 'Cliente') {
            return value.nome; // Exibe apenas o nome do Cliente
        }
        return JSON.stringify(value); // Se for outro objeto, retorna como string (pode ser customizado)
        }
        return value;
    };

    return (
        <table>
        <thead>
            <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                {Object.entries(item).map(([key, value], i) => (
                <td key={i}>{renderCell(key, value)}</td>
                ))}
                <td>
                <button onClick={() => handleDelete(item.id)}>Deletar</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}

export default Table;
