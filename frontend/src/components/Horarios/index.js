import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

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

    const handleDateChange = (dates) => {
        const datasFormatadas = Array.from(new Set(dates.map(date => date.toISOString().split('T')[0])));
        setdatasSelecionadas(datasFormatadas);
    };
  
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

    return (
        <div className="flex flex-row justify-content-evenly align-items-center">
            <Calendar
                value={datasSelecionadas.map(date => new Date(date))}
                onChange={(e) => handleDateChange(e.value)}
                selectionMode="multiple"
                inline
                style={{ margin: '1em' }}
                showWeek
                dateFormat="dd/mm/yyyy"
            />
            <ScrollPanel style={{ width: '100%', height: '300px', margin: '1em' }} className="custombar1">
                {datasSelecionadas.length === 0 
                ? <div  style={{ width: '100%', height: '300px' }} >{' '}</div>
                : datasSelecionadas.map((date) => (
                    <div key={date} className="time-card">
                        <h3>Data selecionada: {date}</h3>
                        {Object.keys(times[date] || {}).map((timeId) => (
                        <div
                        key={timeId}
                        className="flex flex-column justify-content-evenly align-items-center"
                        style={{ bor}}
                        >
                            <div className="col-12 flex flex-row justify-content-center align-items-center">
                                <span style={{ marginRight: '0.5em' }}>Hora de início:</span>
                            <Dropdown
                                value={times[date][timeId]?.startTime || ''}
                                onChange={(e) =>
                                handleTimeChange(date, timeId, 'startTime', e.target.value)
                                }
                                options={horariosDia} optionLabel="time"
                                style={{ width: '45%'}}
                            />
                            </div>
                            <div className="col-12 flex flex-row justify-content-center align-items-center">
                            <span style={{ marginRight: '3em' }}>Duração: </span>
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