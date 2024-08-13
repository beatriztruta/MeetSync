import ComoUsar from '../../components/ComoUsar';
import ConteudoPrincipal from '../../components/ConteudoPrincipal';
import Menu from '../../components/Menu';
import OQueE from '../../components/OQueE';
import './style.css';

export default function PaginaInicial() {
  return (
    <div className="container">
        <Menu></Menu>
        <ConteudoPrincipal></ConteudoPrincipal>
        <OQueE></OQueE>
        <ComoUsar></ComoUsar>
    </div>
  );
}
