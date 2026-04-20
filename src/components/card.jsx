import "../styles/card.css"

function truncar(texto, limite) {
        if (!texto) return "";
        return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
    }


export function CardFicha({ nome, descricao, nivel, image}) {

    return (
        <div className="card">

            <div className="card-img">
                {image && <img src={image} alt={nome} />}
            </div>

            <div className="card-info">
                <h2>{truncar(nome, 20)}</h2>
                <p>Nível: {nivel}</p>
                <p>{truncar(descricao, 30)}</p>
            </div>

        </div>
    );
}

export function CardCampanha({ nome, descricao, sistema}) {

    return(
        <div className={`cardC ${sistema}`}>
            <div className="card-info">
                <h2>{truncar(nome,20)}</h2>
                <p>{truncar(descricao,30)}</p>
            </div>
        </div>
    )
}