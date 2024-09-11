import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/logo.png';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import './style.css';

export default function Menu() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            navigate(`/sala-votacao/${roomId}`);
        } else {
            alert('Por favor, insira um ID de sala válido.');
        }
    };

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/'); }
        },
        {
            label: 'Sobre',
            icon: 'pi pi-fw pi-info-circle',
            command: () => { navigate('/sobre'); }
        },
    ];

    const start = <img src={logo} alt="Logo" style={{ marginRight: '10px', height: '50px' }} />;
    const end = (
        <div className="p-inputgroup">
            <InputText 
                placeholder="ID da Sala" 
                className="p-inputtext custom-input" 
                onChange={(e) => setRoomId(e.target.value)} 
            />
            <button className="p-button custom-button" onClick={handleJoinRoom}>
                <span className="pi pi-sign-in" />
            </button>
        </div>
    );

        return (
            <Menubar
            model={items}
            start={start}
            end={end}
            style={{ backgroundColor: '#2f4f4f' }}
        />
    );  
};
