import Layout from '../../layout/Layout';
import Table from '../../components/Table';
import { React, useState, useEffect } from 'react';
import './styles/orders.css';

function Orders() {
    const url = `http://${import.meta.env.VITE_REACT_APP_HOST}:${import.meta.env.VITE_REACT_APP_PORT}`;
    const [clientes, setClientes] = useState([]);
    const [clienteId, setClienteId] = useState("");
    const [menu, setMenu] = useState([]);
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [cards, setCards] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    useEffect(() => {
        fetch(`${url}/costumers`)
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(err => console.log("Erro ao carregar clientes:", err));
    }, []);

    useEffect(() => {
        fetch(`${url}/menu`)
            .then(res => res.json())
            .then(data => setMenu(data))
            .catch(err => console.log("Erro ao carregar menu:", err));
    }, []);

    useEffect(() => {
        fetch(`${url}/orders`)
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.log("Erro ao carregar pedidos:", err));
    }, []);

    const adicionarAoPedido = (item) => {
        setPedido(prevPedido => [...prevPedido, item]);
        setTotal(prevTotal => prevTotal + parseFloat(item.preco));
    };

    const removerDoPedido = (index) => {
        const itemRemovido = pedido[index];
        setPedido(pedido.filter((_, i) => i !== index));
        setTotal(prevTotal => prevTotal - parseFloat(itemRemovido.preco));
    };

    const verDetalhesPedido = (id) => {
        if (!selectedOrders[id]) {
            fetch(`${url}/orders/${id}`)
                .then(res => res.json())
                .then(data => {
                    setSelectedOrders(prevState => ({
                        ...prevState,
                        [id]: data
                    }));
                })
                .catch(err => console.error("Erro ao buscar detalhes do pedido:", err));
        } else {
            setSelectedOrders(prevState => {
                const updatedOrders = { ...prevState };
                delete updatedOrders[id];
                return updatedOrders;
            });
        }
    };

    const enviarPedido = async () => {
        const itens = pedido.map(item => item.id);
        const pedidoData = {
            cliente_id: clienteId,
            total: total.toFixed(2),
            items: itens
        };

        console.log(pedidoData);

        try {
            const response = await fetch(`${url}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pedidoData)
            });
            if (response.ok) {
                alert("Pedido enviado com sucesso!");
                setPedido([]);
                setTotal(0);
                setClienteId("");
                fetch(`${url}/orders`)
                    .then(res => res.json())
                    .then(data => setCards(data));
            } else {
                alert("Erro ao enviar o pedido.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    const formatDate = (value) => {
        const date = new Date(value);
        return date.toLocaleDateString('pt-BR');
    };

    const fetchPedidos = () => {
        fetch(`${url}/orders`)
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.log("Erro ao carregar pedidos:", err));
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja cancelar o pedido?")) {
            try {
                const response = await fetch(`${url}/orders/${id}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 2 })
                });
                if (response.ok) {
                    alert("Pedido cancelado com sucesso!");
                    fetchPedidos();
                } else {
                    alert("Erro ao cancelar pedido.");
                }
            } catch (error) {
                console.error("Erro ao cancelar pedido:", error);
            }
        }
    };
    
    const handleDelivered = async (id) => {
        if (window.confirm("Tem certeza que deseja marcar este pedido como entregue?")) {
            try {
                const response = await fetch(`${url}/orders/${id}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 3 })
                });
                if (response.ok) {
                    alert("Pedido marcado como entregue com sucesso!");
                    fetchPedidos();
                } else {
                    alert("Erro ao marcar pedido como entregue.");
                }
            } catch (error) {
                console.error("Erro ao marcar pedido como entregue:", error);
            }
        }
    };
    

    return (
        <Layout>
            <div className="orders-container">
                <div className="order-section">
                    <h3>Fazer Pedido</h3>
                    <div className="client-selection">
                        <label>Cliente</label>
                        <select value={clienteId} onChange={e => setClienteId(e.target.value)}>
                            <option value="">Selecione um Cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="menu-selection">
                        <label>Categoria</label>
                        <select value={categoriaSelecionada} onChange={e => setCategoriaSelecionada(e.target.value)}>
                            <option value="">Todas as Categorias</option>
                            {[...new Set(menu.map(item => item.categoria))].map(categoria => (
                                <option key={categoria} value={categoria}>{categoria}</option>
                            ))}
                        </select>

                        <ul>
                            {menu.filter(item => !categoriaSelecionada || item.categoria === categoriaSelecionada).map(item => (
                                <li key={item.id}>
                                    {item.nome} - {item.preco} R$
                                    <button onClick={() => adicionarAoPedido(item)}>Adicionar</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {pedido.length > 0 && (
                        <div className="pedido-section">
                            <h3>Pedido</h3>
                            <ul>
                                {pedido.map((item, index) => (
                                    <li key={index}>
                                        {item.nome} - {item.preco} R$
                                        <button onClick={() => removerDoPedido(index)}>Remover</button>
                                    </li>
                                ))}
                            </ul>
                            <h4>Total: {total.toFixed(2)} R$</h4>
                            <button onClick={enviarPedido}>Finalizar Pedido</button>
                        </div>
                    )}
                </div>

                <div className="orders-list">
                    <h3>Pedidos Feitos</h3>
                    <ul>
                        {cards.map(card => (
                            <li key={card.id} className="card">
                                Pedido #{card.id} <br />
                                Cliente: {card.Cliente.nome} <br /> {/* Corrigido o acesso ao cliente */}
                                Total: {card.total} R$ <br />
                                Data: {formatDate(card.data_pedido)}
                                {selectedOrders[card.id] && selectedOrders[card.id].items && (
                                    <div>
                                        <h4>Itens:</h4>
                                        <ul>
                                            {selectedOrders[card.id].items.map(item => (
                                                <li key={item.cardapio_id}>{item.cardapio.nome}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="bnt-group">
                                    <button 
                                    className="card-btn"
                                    onClick={() => verDetalhesPedido(card.id)}>
                                        {selectedOrders[card.id] ? 'Esconder Detalhes' : 'Ver Detalhes'}
                                    </button>
                                    <button 
                                    className="card-btn"
                                    onClick={() => handleDelete(card.id)}>Cancelar Pedido</button>
                                    <button 
                                    className="card-btn"
                                    onClick={() => handleDelivered(card.id)}>Pedido Entregue</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Table apiUrl={`${url}/orders/delivered`}/>
            </div>
        </Layout>
    );
}

export default Orders;
