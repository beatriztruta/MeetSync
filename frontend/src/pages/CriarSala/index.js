import React from 'react';
import { useState } from 'react';
import Menu from '../../components/Menu';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'; 
import Horarios from '../../components/Horarios';
import './style.css';

export default function CriarSala() {

    const[sala, setSala] = useState({});
    
    const atualizarCampo = (field, value) => {
        setSala(prevUser => ({ ...prevUser, [field]: value }));
      };
    
    return(
        <div>
            <Menu/>
            <div className="flex flex-column align-items-center">
                            <div
                                className="fundo-desfocado mt-3 font-bold text-center w-4 md:w-3"
                                style={{
                                    fontSize: '1.5em',
                                    padding: '0.5em',
                                }}
                            >
                                Criar Sala
                            </div>
                <div 
                    className="flex text-center m-3 fundo-desfocado grid w-full xl:w-8 lg:w-6"
                >
                    <div className="col-12">
                        <InputText
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Nome"
                            required
                            onChange={(e) => atualizarCampo('nome', e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <InputText
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Título da reunião"
                            required
                            onChange={(e) => atualizarCampo('titulo', e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <InputTextarea
                            className="fundo-desfocado w-9 md:w-7"
                            style={{ height: '8em' }}
                            placeholder="Descrição"
                            onChange={(e) => atualizarCampo('descricao', e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <Horarios sala={sala} atualizarHorarios={atualizarCampo} />
                    </div>
                    <div className="col-12 flex flex-row justify-content-center">
                    <Button
                        label="Cria Sala"
                        className="create-btn w-6 mt-3"
                        style={{ margin: '0.5em' }}
                        onClick={() => console.log(sala)}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}