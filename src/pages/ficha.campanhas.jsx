import { NavBar } from "../components/NavBar";


export function Fichas_sistemas () {
 return (
    <>
             <NavBar
            links={[
                { text: "Fichas", to: "/personagem"},
                { text: "Campanhas", to: "/campanhas" },
                { text: "Favoritos", to: "/favoritos" }
            ]}
        />
    </>
 )
}