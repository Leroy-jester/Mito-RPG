import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import "../styles/home.css";

export function Home() {
    return (
        <div className="page">
            <NavBar
                links={[
                    { text: "Fichas", to: "/personagem" },
                    { text: "Campanhas", to: "/campanhas" },
                    { text: "Favoritos", to: "/favoritos" }
                ]}
            />

            <div className="home-container">
                <section className="home-hero">
                    <div className="home-hero-content">
                        <span className="home-badge">Sistema de RPG</span>

                        <h1>Crie fichas, organize campanhas e monte sua aventura</h1>

                        <p>
                            Gerencie personagens de DnD, Ordem Paranormal e Tormenta20
                            em um só lugar, com favoritos, campanhas e visual personalizado
                            por sistema.
                        </p>

                        <div className="home-actions">
                            <Link to="/personagem" className="btn-home primary">
                                Ver fichas
                            </Link>

                            <Link to="/campanhas" className="btn-home secondary">
                                Ver campanhas
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="home-grid">
                    <Link to="/personagem" className="home-card">
                        <h2>Fichas</h2>
                        <p>
                            Crie personagens, edite atributos, acompanhe classes,
                            níveis e detalhes de cada sistema.
                        </p>
                    </Link>

                    <Link to="/campanhas" className="home-card">
                        <h2>Campanhas</h2>
                        <p>
                            Organize campanhas e adicione fichas compatíveis com o
                            mesmo sistema de jogo.
                        </p>
                    </Link>

                    <Link to="/favoritos" className="home-card">
                        <h2>Favoritos</h2>
                        <p>
                            Salve rapidamente suas fichas favoritas para acessar
                            sempre que precisar.
                        </p>
                    </Link>
                </section>
            </div>
        </div>
    );
}