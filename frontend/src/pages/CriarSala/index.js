import Menu from '../../components/Menu';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';  
import { Button } from 'primereact/button';      
import './style.css';
import { useState } from 'react';

export default function CriarSala() {
    
    const duracoes = [
        { name: '30 minutos', code: '0.5' },
        { name: '1 hora', code: '1' },
        { name: '2 horas', code: '2' },
        { name: '3 horas', code: '3' },
        { name: '4 horas', code: '4' }
    ];

    const [duracaoEscolhida, setDuracaoEscolhida] = useState(null);
    const [dates, setDates] = useState(null);

    return(
        <div>
            <Menu/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    className="formulario-criar-sala fundo-desfocado grid"
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
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        hideOnRangeSelection
                        style={{ width: '60%' }}
                        className="fundo-desfocado"
                    />
                    </div>
                </div>
                <Button label="Cria Sala" className="fundo-desfocado botao-salvar" style={{ color: 'black' }}/>
            </div>
        </div>
    );
}