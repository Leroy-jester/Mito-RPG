import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { personagemController } from "../components/controller/controller";
import { NavBar } from "../components/NavBar";
import { CardFicha } from "../components/card";
import "../styles/fichas.css";

export function Fichas_Favoritas() {
    const [favoritos, setFavoritos] = useState([]);

    function carregar() {
        const resultado = personagemController.listarFavoritos();

        if (!resultado.ok) {
            setFavoritos([]);
            return;
        }

        setFavoritos(resultado.data);
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div className="page">
            <NavBar
                links={[
                    { text: "Fichas", to: "/personagem" },
                    { text: "Campanhas", to: "/campanhas" }
                ]}
            />

            <div className="page-container">
                <div className="container-lista">
                    <h2 className="h2">Fichas favoritas</h2>

                    {favoritos.length === 0 ? (
                        <div className="vazio-container">
                            <h2>Nenhuma ficha favoritada</h2>
                            <p>Abra uma ficha e clique na estrela para salvá-la como favorita.</p>
                        </div>
                    ) : (
                        <div className="grid">
                            {favoritos.map((p) => (
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