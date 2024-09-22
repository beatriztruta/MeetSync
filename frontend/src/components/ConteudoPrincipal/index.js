import { useNavigate } from 'react-router-dom';
import './style.css'
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { isValidValue } from '../../utils/functions';

export default function ConteudoPrincipal(){

    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const toast = useRef(null);
    const showError = () => {
        toast.current.show({severity:'error', summary: 'Erro', detail:'Preencha o nome', life: 3000});
    }

    return(
        <div>
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
                    <button
                    className="create-btn"
                    onClick={() => {
                        isValidValue(nome) 
                        ? navigate('/criar-sala', { state: { nomeUser: nome } })
                        : showError()
                        }}
                    >
                        + Criar Sala
                    </button>
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
}