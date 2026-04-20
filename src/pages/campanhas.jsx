import { Link } from "react-router-dom";
import { ModalCampanha } from "../components/modal";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { campanhaController } from "../components/controller/controller";
import { CardCampanha } from "../components/card";
import "../styles/campanhas.css";

export function Campanhas() {
    const [aberto, setAberto] = useState(false);
    const [campanhas, setCampanhas] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("");

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

    const campanhasFiltradas = campanhas.filter((campanha) => {
        const nomeMatch = campanha.nome
            .toLowerCase()
            .includes(busca.toLowerCase().trim());

        const sistemaMatch = filtro ? campanha.sistema === filtro : true;

        return nomeMatch && sistemaMatch;
    });

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
                    <div>
                        <h2 className="h2">Lista de campanhas</h2>

                        <input
                            type="text"
                            placeholder="Buscar campanha"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />

                        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                            <option value="">Todos os sistemas</option>
                            <option value="DnD">DnD</option>
                            <option value="OP">Ordem Paranormal</option>
                            <option value="Tor20">Tormenta 20</option>
                        </select>
                    </div>

                    {campanhasFiltradas.length === 0 ? (
                        <div className="vazio-container">
                            <h2>Nenhuma campanha encontrada</h2>
                            <p>Crie sua primeira campanha para começar sua aventura.</p>

                            <button onClick={() => setAberto(true)}>
                                Criar campanha
                            </button>
                        </div>
                    ) : (
                        <div className="grid">
                            {campanhasFiltradas.map((campanha) => (
                                <Link key={campanha.id} to={`/campanhas/${campanha.id}`}>
                                    <CardCampanha
                                        nome={campanha.nome}
                                        descricao={campanha.descricao}
                                        sistema={campanha.sistema}
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