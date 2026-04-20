import { Link } from "react-router-dom";
import "../styles/NavBar.css"

export function NavBar({ links = [] }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                {links.map((link, i) => (
                    <Link key={i} to={link.to}>
                        {link.text}
                    </Link>
                ))}
            </div>

            <div className="nav-right">
                <Link to="/">Home</Link>
            </div>
        </nav>
    );
}