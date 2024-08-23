import { Dropdown } from 'primereact/dropdown';
import { ListBox } from 'primereact/listbox';
import './style.css';
import { useState } from 'react';

export default function NovoHorario() {

    const duracoes = [
        { name: '30 minutos', code: '0.5' },
        { name: '1 hora', code: '1' },
        { name: '2 horas', code: '2' },
        { name: '3 horas', code: '3' },
        { name: '4 horas', code: '4' }
    ];

    const [duracaoEscolhida, setDuracaoEscolhida] = useState(null);
    return(
        <div className="container-horario flex flex-row m-3">
            <div className="flex flex-column">
                <span className="mb-1">Horário de Início</span>
                <Dropdown
                    options={duracoes} optionLabel="name" 
                    placeholder="Selecione o horário"
                    style={{ textAlign: 'left', marginRight: '0.5em' }}
                    value={duracaoEscolhida}
                    onChange={(e) => setDuracaoEscolhida(e.value.code)}
                    className="fundo-desfocado"
                    showClear
                />
            </div>
            <div className="flex flex-column">
                <span className="mb-1">Duração</span>
                <Dropdown
                    options={duracoes} optionLabel="name" 
                    placeholder="Selecione a Duração"
                    style={{ textAlign: 'left' }}
                    value={duracaoEscolhida}
                    //onChange={(e) => setDuracaoEscolhida(e.value.code)}
                    className="fundo-desfocado"
                />
            </div>
        </div>
    );
}