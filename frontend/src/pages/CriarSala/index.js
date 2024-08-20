import { useState } from 'react';
import Menu from '../../components/Menu';
import './style.css';
import { InputText } from 'primereact/inputtext';
        

export default function CriarSala() {
    
    const [nome, setNome] = useState('');

    return(
        <div className="container-criar-sala">
            <Menu></Menu>
            <div className="formulario-criar-sala grid">
                <div  className="field col-6">
                    <InputText style={{'width': '100%'}}></InputText>
                </div>
                <div  className="field col-6">
                    <InputText style={{'width': '100%'}}></InputText>
                </div>
            </div>
        </div>
    );
}