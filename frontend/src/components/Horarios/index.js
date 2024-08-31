import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';

export default function Horarios() {

    const [datasSelecionadas, setdatasSelecionadas] = useState([]);
    const [times, setTimes] = useState({});

    const duracoes = [
        { name: '30 minutos', code: '0.5' },
        { name: '1 hora', code: '1' },
        { name: '2 horas', code: '2' },
        { name: '3 horas', code: '3' },
        { name: '4 horas', code: '4' }
    ];

    const horariosDia = [
        {
            time: '00:00',
            code: 0
        },
        {
            time: '01:00',
            code: 1
        },
        {
            time: '02:00',
            code: 2
        },
        {
            time: '03:00',
            code: 3
        },
        {
            time: '04:00',
            code: 4
        },
        {
            time: '05:00',
            code: 5
        },
        {
            time: '06:00',
            code: 6
        },
        {
            time: '07:00',
            code: 7
        },
        {
            time: '08:00',
            code: 8
        },
        {
            time: '09:00',
            code: 9
        },
        {
            time: '10:00',
            code: 10
        },
        {
            time: '11:00',
            code: 11
        },
        {
            time: '12:00',
            code: 12
        },
        {
            time: '13:00',
            code: 13
        },
        {
            time: '14:00',
            code: 14
        },
        {
            time: '15:00',
            code: 15
        },
        {
            time: '16:00',
            code: 16
        },
        {
            time: '17:00',
            code: 17
        },
        {
            time: '18:00',
            code: 18
        },
        {
            time: '19:00',
            code: 19
        },
        {
            time: '20:00',
            code: 20
        },
        {
            time: '21:00',
            code: 21
        },
        {
            time: '22:00',
            code: 22
        },
        {
            time: '23:00',
            code: 23
        },
    ];

    const handleTimeChange = (dateStr, timeId, field, value) => {
        setTimes((prevTimes) => ({
            ...prevTimes,
            [dateStr]: { ...prevTimes[dateStr], [timeId]: { ...prevTimes[dateStr][timeId], [field]: value } },
        }));
    };

    const handleAddTime = (dateStr) => {
        const newTimeId = Date.now();
        setTimes((prevTimes) => ({
        ...prevTimes,
        [dateStr]: {
            ...prevTimes[dateStr],
            [newTimeId]: { startTime: '', duration: '1h' },
        },
        }));
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
                onChange={(e) => setdatasSelecionadas(e.value)}
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
                        <h3>Data selecionada: {formatDate(date)}</h3>
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
                                value={times[date][timeId]?.duration || '1h'}
                                onChange={(e) =>
                                handleTimeChange(date, timeId, 'duration', e.target.value)
                                }
                                options={duracoes} optionLabel="name"
                                style={{ width: '45%'}}
                            />
                            </div>
                        </div>
                        ))}
                        <Button
                            className="create-btn"
                            style={{ marginTop: '0.5em' }}
                            onClick={() => handleAddTime(date)}>
                                <i className="pi pi-plus"></i> add
                        </Button>
                    </div>
                ))}
            </ScrollPanel>
        </div>
    );
}