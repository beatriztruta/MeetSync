import './style.css';
import logo from '../../assets/imgs/logo.png';

export default function Menu() {
    return(
      <header className="menu-ms">
        <img src={logo} className="App-logo" alt="Logo da empresa" />
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </header>
    );  
  };
