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
                    <h2 className="h2">Lista de fichas</h2>

                    {personagens.length === 0 && <p>Nenhuma ficha criada</p>}

                    <div className="grid">
                        {personagens.map((p) => (
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
                </div>
            </div>
        </div>
    );
}