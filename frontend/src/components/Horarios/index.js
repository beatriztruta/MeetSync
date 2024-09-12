import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import { duracoes, horariosDia } from '../../utils/constants';

export default function Horarios({  atualizarHorarios }) {

    const [datasSelecionadas, setdatasSelecionadas] = useState([]);
    const [times, setTimes] = useState({});

    const handleTimeChange = (dateStr, timeId, field, value) => {
        setTimes(prevTimes => {
            const updatedTimes = {
                ...prevTimes,
                [dateStr]: {
                    ...prevTimes[dateStr],
                    [timeId]: {
                        ...prevTimes[dateStr][timeId],
                        [field]: value
                    }
                }
            };
            atualizarHorarios('horarios', updatedTimes);
            return updatedTimes;
        });
    };    

    const handleAddTime = (dateStr) => {
        const newTimeId = Date.now();
        setTimes(prevTimes => {
            const updatedTimes = {
                ...prevTimes,
                [dateStr]: {
                    ...prevTimes[dateStr],
                    [newTimeId]: { startTime: '', duration: '1h' }
                }
            };
            return updatedTimes;
        });
    };
    

    const handleRemoveTime = (dateStr, timeId) => {
        setTimes((prevTimes) => {
            const updatedTimes = { ...prevTimes };
            delete updatedTimes[dateStr][timeId];
    
            if (Object.keys(updatedTimes[dateStr] || {}).length === 0) {
                delete updatedTimes[dateStr];
            }
    
                
            atualizarHorarios('horarios', updatedTimes);
            return updatedTimes;
        });
    };

    function formatDate(date) {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    addLocale('pt-br', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'],
        today: 'Hoje',
        clear: 'Limpar'
    });

    return (
        <div className="flex flex-column md:flex-row justify-content-evenly align-items-center">
            <Calendar
                value={datasSelecionadas.map(date => new Date(date))}
                onChange={(e) => {
                    const formattedDates = e.value.map(date => formatDate(date));
                    const datas = [];
                    formattedDates.forEach(data => {
                        datas.push(data);
                    });
                    setdatasSelecionadas(datas);
                }}
                selectionMode="multiple"
                inline
                style={{ margin: '1em',  width: '95%', height: '95%' }}
                showWeek
                dateFormat="dd/mm/yyyy"
                locale="pt-br"
            />
            <ScrollPanel style={{ width: '100%', height: '300px', margin: '1em' }} className="custombar1">
                {datasSelecionadas.length === 0 
                ? <div
                    style={{ width: '100%', height: '300px' }}
                    className="flex flex-column align-items-center justify-content-center"
                >
                    <h1>Horários Escolhidos</h1>
                    <p style={{ color: 'grey' }}>
                        Clique nos dias desejados e escolha<br></br> os horários de início e duração
                    </p>
                </div>
                : datasSelecionadas.map((date) => (
                    <div key={date} className="time-card" style={{ marginLeft: '0.5em' }}>
                        <h3>Data selecionada: {date}</h3>
                        {Object.keys(times[date] || {}).map((timeId) => (
                        <div
                        key={timeId}
                        className="flex flex-column justify-content-evenly align-items-center"
                        >
                            <div className="col-12 flex flex-row justify-content-around align-items-center">
                                <span  style={{ width: '55%'}}>Hora de início:</span>
                            <Dropdown
                                value={times[date][timeId]?.startTime || ''}
                                onChange={(e) =>
                                handleTimeChange(date, timeId, 'startTime', e.target.value)
                                }
                                options={horariosDia} optionLabel="time"
                                style={{ width: '45%'}}
                            />
                            </div>
                            <div className="col-12 flex flex-row justify-content-around align-items-center">
                            <span  style={{ width: '55%'}}>Duração: </span>
                            <Dropdown
                                value={times[date][timeId]?.duration}
                                onChange={(e) =>{
                                    handleTimeChange(date, timeId, 'duration', e.target.value);
                                }}
                                options={duracoes} optionLabel="name"
                                style={{ width: '45%'}}
                            />
                            </div>
                            <Button
                                className="p-button-danger create-btn justify-content-center"
                                onClick={() => handleRemoveTime(date, timeId)}
                            >
                                <i className="pi pi-trash"></i>
                            </Button>
                        </div>
                        ))}
                        <Button
                            className="create-btn justify-content-center"
                            style={{ marginTop: '0.5em' }}
                            onClick={() => handleAddTime(date)}>
                                <i className="pi pi-plus"></i>
                        </Button>
                    </div>
                ))}
            </ScrollPanel>
        </div>
    );
}