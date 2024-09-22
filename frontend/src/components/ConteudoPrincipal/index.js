import { useNavigate } from 'react-router-dom';
import './style.css'
import { useState } from 'react';

export default function ConteudoPrincipal(){

    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    return(
        <div className="conteudo-principal">
            <div className="titulo">
            <h1>MeetSync</h1>
            <span>Simplificando a sincronia das suas reuniões!</span>
            </div>

            <div className="formulario-inicio">
                <label htmlFor="name">Seu nome</label>
                <input
                    id="texto-pg-inicial"
                    type="text"
                    placeholder="Digite o seu nome"
                    onChange={(e) =>setNome(e.target.value)}
                />
                <button className="create-btn" onClick={() => {navigate('/criar-sala', { state: { nomeUser: nome } })}}>+ Criar Sala</button>
            </div>
      </div>
    );
}