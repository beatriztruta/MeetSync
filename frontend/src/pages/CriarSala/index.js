import { useState } from 'react';
import Menu from '../../components/Menu';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';  
import { Button } from 'primereact/button'; 
import './style.css';

export default function CriarSala() {
    
    const duracoes = [
        { name: '30 minutos', code: '0.5' },
        { name: '1 hora', code: '1' },
        { name: '2 horas', code: '2' },
        { name: '3 horas', code: '3' },
        { name: '4 horas', code: '4' }
    ];

    const [duracaoEscolhida, setDuracaoEscolhida] = useState(null);
    const [datas, setDatas] = useState(null);

    return(
        <div>
            <Menu/>
            <div className="flex flex-column align-items-center">
                            <div
                                className="fundo-desfocado"
                                style={{
                                    marginTop: '0.5em',
                                    padding: '0.5em', 
                                    width: '20%',
                                    fontSize: '1.5em',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
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
                            placeholder="Título"
                            style={{ width: '60%' }}
                        />
                    </div>
                    <div className="col-12">
                        <InputTextarea
                            className="fundo-desfocado"
                            style={{ height: '7em', width: '60%' }}
                            placeholder="Descrição"
                        />
                    </div>
                    <div className="col-12">
                    <Dropdown
                        options={duracoes} optionLabel="name" 
                        placeholder="Selecione a Duração"
                        style={{ width: '60%', textAlign: 'left' }}
                        value={duracaoEscolhida}
                        onChange={(e) => setDuracaoEscolhida(e.value.code)}
                        className="fundo-desfocado"
                    />
                    </div>
                    <div className="col-12">
                    <Calendar
                        value={datas}
                        onChange={(e) => setDatas(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        hideOnRangeSelection
                        style={{ width: '60%' }}
                        placeholder="Selecione os limites de datas"
                    />
                    </div>
                    <Button label="Cria Sala" className="create-btn w-full mt-3" style={{ margin: '0.5em' }}/>
                </div>
            </div>
        </div>
    );
}