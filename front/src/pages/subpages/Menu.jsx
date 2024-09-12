import Layout from "../../layout/Layout";
import Table from "../../components/Table";
import React, { useState } from "react";
import "./styles/menu.css";  // Arquivo de estilo separado

function Menu() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}/menu`
    const [showFilters, setShowFilters] = useState(false);
    const [filterPrice, setFilterPrice] = useState("");
    const [filterCateg, setFilterCateg] = useState("");
    const [ordenacao, setOrdenacao] = useState("");
    const [data, setData] = useState({
        nome: "",
        descricao: "",
        preco: "",
        categoria: ""
    });

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch( url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("Opção adicionada com sucesso!");
                location.reload();
            } else {
                alert("Erro ao adicionar a opção");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao conectar ao servidor");
        }
    };

    return (
        <Layout>
            <h3 className="menu-title">Menu</h3>

            <button className="toggle-button" onClick={toggleFilters}>
                {showFilters ? "Esconder Opções" : "Mostrar Opções"}
            </button>

            {showFilters && (
                <div className="filter-section">
                    <div className="add-option">
                        <h4>Adicionar Opção no Menu</h4>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome da Opção"
                                value={data.nome}
                                onChange={handleInput}
                                className="input-field"
                            />
                            <textarea
                                name="descricao"
                                placeholder="Descrição da Opção"
                                value={data.descricao}
                                onChange={handleInput}
                                className="textarea-field"
                            />
                            <input
                                type="text"
                                name="preco"
                                placeholder="Preço"
                                value={data.preco}
                                onChange={handleInput}
                                className="input-field"
                            />
                            <input
                                type="text"
                                name="categoria"
                                placeholder="Categoria"
                                value={data.categoria}
                                onChange={handleInput}
                                className="input-field"
                            />
                            <button type="submit" className="submit-button">Adicionar Opção</button>
                        </form>
                    </div>

                    <div className="filters">
                        <h4>Filtrar Menu</h4>
                        <input
                            type="text"
                            placeholder="Filtrar por Categoria"
                            value={filterCateg}
                            onChange={(e) => setFilterCateg(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por Preço"
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="sort-section">
                        <h4>Ordenar por:</h4>
                        <select onChange={(e) => setOrdenacao(e.target.value)} value={ordenacao} className="select-field">
                            <option value="">Escolha uma opção</option>
                            <option value="precoAsc">Preço (Menor para Maior)</option>
                            <option value="precoDesc">Preço (Maior para Menor)</option>
                            <option value="categoriaAsc">Categoria (A-Z)</option>
                            <option value="categoriaDesc">Categoria (Z-A)</option>
                        </select>
                    </div>
                </div>
            )}

            <Table
                apiUrl={ url }
                categoria={ filterCateg }
                preco={ filterPrice }
                ordenacao={ ordenacao }
            />
        </Layout>
    );
}

export default Menu;