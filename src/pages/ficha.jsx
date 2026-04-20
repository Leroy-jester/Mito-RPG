import { useParams, useNavigate, Link } from "react-router-dom";
import { personagemController } from "../components/controller";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ModalEditar } from "../components/modal";
import "./ficha.css";

export function Ficha() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [aberto, setAberto] = useState(false);
    const [personagem, setPersonagem] = useState(null);

    function carregar() {
        const resultado = personagemController.buscarPersonagem(id);

        if (!resultado.ok) {
            setPersonagem(null);
            return;
        }

        setPersonagem(resultado.data);
    }

    useEffect(() => {
        carregar();
    }, [id]);

    function remover() {
        const resultado = personagemController.removerPersonagem(id);

        if (!resultado.ok) {
            alert(resultado.erro);
            return;
        }

        navigate("/personagem");
    }

    if (!personagem) {
        return <p>Personagem não encontrado</p>;
    }

    return (
        <div className="page">
            <NavBar
                links={[
                    { text: "Fichas", to: "/personagem" },
                    { text: "Campanhas", to: "/campanhas" },
                    { text: "Favoritos", to: "/favoritos" }
                ]}
            />

            <div className={`ficha-container ${personagem.sistema}`}>
                <div className="ficha-header">
                    <div>
                        <h1>{personagem.nome}</h1>
                        <p className="sistema">Sistema: {personagem.sistema}</p>
                    </div>

                    {personagem.imagem && (
                        <img
                            src={personagem.imagem}
                            alt={personagem.nome}
                            className="ficha-imagem"
                        />
                    )}
                </div>

                <p className="descricao">{personagem.descricao}</p>

                <div className="infos-gerais">
                    {personagem.nivel && <p><strong>Nível:</strong> {personagem.nivel}</p>}
                    {personagem.nex !== undefined && <p><strong>NEX:</strong> {personagem.nex}</p>}
                    {personagem.raca && <p><strong>Raça:</strong> {personagem.raca}</p>}
                    {personagem.origem && <p><strong>Origem:</strong> {personagem.origem}</p>}
                    {personagem.classe && <p><strong>Classe:</strong> {personagem.classe}</p>}
                    {personagem.trilha && <p><strong>Trilha:</strong> {personagem.trilha}</p>}
                    {personagem.divindade && <p><strong>Divindade:</strong> {personagem.divindade}</p>}
                </div>

                <div className="atributos-box">
                    <h2>Atributos</h2>

                    <div className="atributos-grid">
                        {Object.entries(personagem.atributos || {}).map(([k, v]) => (
                            <div key={k} className="atributo-card">
                                <strong>{k}</strong>
                                <span>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="acoes">
                    <button onClick={() => setAberto(true)}>Editar</button>
                    <button className="danger" onClick={remover}>Excluir</button>
                </div>

                {aberto && (
                    <ModalEditar
                        fechar={() => {
                            setAberto(false);
                            carregar();
                        }}
                        id={id}
                    />
                )}

                <br />
            </div>
        </div>
    );
}