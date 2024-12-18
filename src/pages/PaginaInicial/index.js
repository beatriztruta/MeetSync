import ComoUsar from "../../components/ComoUsar";
import ConteudoPrincipal from "../../components/ConteudoPrincipal";
import Menu from "../../components/Menu";
import OQueE from "../../components/OQueE";
import QuemSomos from "../../components/QuemSomos";
import "./style.css";

export default function PaginaInicial() {
  return (
    <div className="container">
        <Menu isPaginaInicial/>
        <ConteudoPrincipal></ConteudoPrincipal>
        <OQueE/>
        <ComoUsar/>
        <QuemSomos/>
    </div>
  );
}
