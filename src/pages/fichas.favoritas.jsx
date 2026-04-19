import { Link } from "react-router-dom"
import { NavBar } from "../components/NavBar";


export function Fichas_Favoritas () {


 return (
    <>  
        <NavBar
            links={[
                { text: "Fichas", to: "/personagem"},
                { text: "Campanhas", to: "/campanhas" },
            ]}
        />
        <h1>bem vindo a Favoritos</h1>
        <Link to={'/'}>Voltar</Link>
    </>
 )
}