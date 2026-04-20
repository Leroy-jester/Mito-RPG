import { Link } from "react-router-dom";
import { Modal } from "../components/modal";
import { useState, useEffect } from "react";
import { personagemController } from "../components/controller";
import { CardFicha } from "../components/card";
import { NavBar } from "../components/NavBar";
import "./fichas.css";

export function Fichas() {
    const [aberto, setAberto] = useState(false);
    const [personagens, setPersonagens] = useState([]);
    const [buscar, setBuscar ] = useState('')

    function carregar() {
        const resultado = personagemController.listarPersonagens();

        if (!resultado.ok) {
            setPersonagens([]);
            return;
        }

        setPersonagens(resultado.data);
    }

    useEffect(() => {
        carregar();
    }, []);

    const fichasFiltradas = personagens.filter((personagem) =>
        personagem.nome.toLowerCase().includes(buscar.toLowerCase().trim())
    );

    return (
        <div className="page">
            <NavBar
                links={[
                    { text: "Campanhas", to: "/campanhas" },
                    { text: "Favoritos", to: "/favoritos" }
                ]}
            />

            <div className="page-container">
                <div className="page-header-hero fichas-hero">
                    <h1>Bem-vindo a Fichas</h1>

                    <div>
                        <p>Crie, organize e visualize fichas dos seus personagens.</p>

                        <button onClick={() => setAberto(true)}>
                            Criar ficha
                        </button>
                    </div>
                </div>

                {aberto && (
                    <Modal
                        fechar={() => {
                            setAberto(false);
                            carregar();
                        }}
                    />
                )}

                <div className="container-lista">
                    <div>
                        <h2 className="h2">Lista de fichas</h2>
                        
                        <input
                            type="text"
                            placeholder="Buscar campanha"
                            value={buscar}
                            onChange={(e) => setBuscar(e.target.value)}
                        />
                    </div>

                    {fichasFiltradas.length === 0 ? (
                        <div className="vazio-container">
                            <h2>Nenhuma ficha encontrada</h2>
                            <p>Crie sua primeira ficha para começar sua aventura.</p>

                            <button onClick={() => setAberto(true)}>
                                Criar ficha
                            </button>
                        </div>
                    ) : (
                        <div className="grid">
                        {fichasFiltradas.map((p) => (
                            <Link key={p.id} to={`/personagem/${p.id}`}>
                                <CardFicha
                                    nome={p.nome}
                                    descricao={p.descricao}
                                    nivel={p.nivel}
                                    image={p.imagem}
                                />
                            </Link>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}