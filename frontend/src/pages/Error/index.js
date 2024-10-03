import "./style.css";
import { Link } from "react-router-dom";
import notfound from "../../assets/imgs/notfound.svg";

export default function NotFound(){
    return(
        <div className="container-error">
            <img src={notfound} alt="Pagina nao encontrada" />
            <h1>Página Não Encontrada</h1>
            <Link to="/">
                Voltar à Tela Inicial
            </Link>
        </div>
    );
}