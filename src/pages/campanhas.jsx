import { Link } from "react-router-dom";
import { ModalCampanha } from "../components/modal";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { campanhaController } from "../components/controller";
import { CardCampanha } from "../components/card";
import "./campanhas.css";

export function Campanhas() {
    const [aberto, setAberto] = useState(false);
    const [campanhas, setCampanhas] = useState([]);

    function carregar() {
        const resultado = campanhaController.listarCampanhas();

        if (!resultado.ok) {
            setCampanhas([]);
            return;
        }

        setCampanhas(resultado.data);
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div className="page">
            <NavBar
                links={[
                    { text: "Fichas", to: "/personagem" },
                    { text: "Favoritos", to: "/favoritos" }
                ]}
            />

            <div className="page-container">
                <div className="page-header-hero">
                    <h1>Bem-vindo a Campanhas</h1>

                    <div>
                        <p>Crie suas campanhas para jogar com seus amigos.</p>

                        <button onClick={() => setAberto(true)}>
                            Criar campanha
                        </button>
                    </div>
                </div>

                {aberto && (
                    <ModalCampanha
                        fechar={() => {
                            setAberto(false);
                            carregar();
                        }}
                    />
                )}

                <div className="container-lista">
                    <h2 className="h2">Lista de campanhas</h2>

                    {campanhas.length === 0 && <p>Nenhuma campanha criada</p>}

                    <div className="grid">
                        {campanhas.map((campanha) => (
                            <Link key={campanha.id} to={`/campanhas/${campanha.id}`}>
                                <CardCampanha
                                    nome={campanha.nome}
                                    descricao={campanha.descricao}
                                    sistema={campanha.sistema}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}