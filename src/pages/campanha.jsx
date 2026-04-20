import { useParams, Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { campanhaController, personagemController } from "../components/controller";
import { useEffect, useState } from "react";
import "./campanha.css";
import { ModalEditarCampanha } from "../components/modal";

export function Campanha() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [campanha, setCampanha] = useState(null);
  const [fichasDisponiveis, setFichasDisponiveis] = useState([]);

  function carregarTudo() {
    const dados = campanhaController.buscarCampanha(id);

    if (!dados.ok) {
      setCampanha(null);
      return;
    }

    const campanhaAtual = dados.data;
    setCampanha(campanhaAtual);

    const todasFichasResultado = personagemController.listarPersonagens();
    const todasFichas = todasFichasResultado.ok ? todasFichasResultado.data : [];

    const idsNaCampanha = (campanhaAtual.fichas || []).map((f) => f.id);

    const filtradas = todasFichas.filter(
      (f) =>
        f.sistema === campanhaAtual.sistema &&
        !idsNaCampanha.includes(f.id)
    );

    setFichasDisponiveis(filtradas);
  }

  useEffect(() => {
    carregarTudo();
  }, [id]);

  function adicionarFicha(ficha) {
    const resultado = campanhaController.adicionarFichaNaCampanha(id, ficha);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    carregarTudo();
  }

  function removerFicha(idFicha) {
    const resultado = campanhaController.removerFichaDaCampanha(id, idFicha);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    carregarTudo();
  }

  function removerCampanha() {
    const confirmar = confirm("Tem certeza que deseja excluir essa campanha?");

    if (!confirmar) return;

    const resultado = campanhaController.removerCampanha(id);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    navigate("/campanhas");
  }

  if (!campanha) {
    return <p>Campanha não encontrada</p>;
  }

  return (
    <div className="page">
      <NavBar
        links={[
          { text: "Fichas", to: "/personagem" },
          { text: "Campanhas", to: "/campanhas" },
          { text: "Favoritos", to: "/favoritos" },
        ]}
      />

      <div className={`campanha-container ${campanha.sistema}`}>
        <h1>{campanha.nome}</h1>

        <p className="sistema">Sistema: {campanha.sistema}</p>

        <p className="descricao">{campanha.descricao}</p>

        <div className="acoes">
          <button onClick={() => setAberto(true)}>Editar campanha</button>

            {aberto && (
                        <ModalEditarCampanha
                            fechar={() => {
                                setAberto(false);
                                carregarTudo();
                            }}
                            id={id}
                        />
            )}

          <button className="danger" onClick={removerCampanha}>
            Excluir
          </button>
        </div>

        <div className="fichas-campanha">
          <h2>Fichas da campanha</h2>

          {(campanha.fichas || []).length === 0 && (
            <p className="vazio">Nenhuma ficha adicionada ainda.</p>
          )}

          {(campanha.fichas || []).map((ficha) => (
            <div key={ficha.id} className="ficha-item">
              <div className="ficha-item-info">
                <strong>{ficha.nome}</strong>
                <span>{ficha.classe || "Sem classe"}</span>
              </div>

              <button
                className="danger"
                onClick={() => removerFicha(ficha.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="lista-fichas-disponiveis">
          <h2>Adicionar fichas do sistema {campanha.sistema}</h2>

          {fichasDisponiveis.length === 0 && (
            <p className="vazio">
              Não há fichas disponíveis desse sistema para adicionar.
            </p>
          )}

          {fichasDisponiveis.map((ficha) => (
            <div key={ficha.id} className="ficha-disponivel">
              <div className="ficha-disponivel-info">
                <strong>{ficha.nome}</strong>
                <span>{ficha.classe || "Sem classe"}</span>
              </div>

              <button onClick={() => adicionarFicha(ficha)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}