import { NavBar } from "../components/NavBar"

export function Home () {
    return(
        <>        
        <NavBar
            links={[
                { text: "fichas", to: "/personagem"},
                { text: "Campanhas", to: "/campanhas" },
                { text: "Favoritos", to: "/favoritos" }
            ]}
        />
        <div>
        <h1>Bem vindo ao site para fazer fichas</h1>
        <p>aqui você vai aprender a fazer sites para nossas fichas e campanhas </p>
        </div>
        </>
    )
}