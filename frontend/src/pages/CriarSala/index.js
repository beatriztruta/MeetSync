import Menu from '../../components/Menu';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'; 
import Horarios from '../../components/Horarios';
import './style.css';

export default function CriarSala() {
    
    return(
        <div>
            <Menu/>
            <div className="flex flex-column align-items-center">
                            <div
                                className="fundo-desfocado mt-3 font-bold text-center"
                                style={{
                                    width: '20%',
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
                            className="fundo-desfocado"
                            placeholder="Nome"
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className="col-12">
                        <InputText
                            className="fundo-desfocado"
                            placeholder="Título da reunião"
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className="col-12">
                        <InputTextarea
                            className="fundo-desfocado"
                            style={{ width: '60%', height: '8em' }}
                            placeholder="Descrição"
                        />
                    </div>
                    <div className="col-12">
                        <Horarios/>
                    </div>
                    <div className="col-12 flex flex-row justify-content-center">
                    <Button label="Cria Sala" className="create-btn w-6 mt-3" style={{ margin: '0.5em' }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}