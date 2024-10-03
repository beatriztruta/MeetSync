import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { isValidValue } from "../../utils/functions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./style.css"

export default function ConteudoPrincipal(){

    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const toast = useRef(null);
    const showError = () => {
        toast.current.show({severity:"error", summary: "Erro", detail:"Preencha o nome", life: 3000});
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
                    <InputText
                        id="texto-pg-inicial"
                        placeholder="Digite o seu nome"
                        onChange={(e) =>setNome(e.target.value)}
                        value={nome}
                    />
                    <Button
                    className="create-btn"
                    onClick={() => {
                        isValidValue(nome) 
                        ? navigate("/criar-sala", { state: { nomeUser: nome } })
                        : showError()
                        }}
                    >
                        + Criar Sala
                    </Button>
                </div>
            </div>
            <Toast ref={toast} className="toast" />
        </div>
    );
}