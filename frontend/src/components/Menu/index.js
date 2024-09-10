import './style.css';
import logo from '../../assets/imgs/logo.png';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';  // Opcional, para aplicar o tema
import 'primereact/resources/primereact.min.css';  // CSS do PrimeReact
import 'primeicons/primeicons.css';  // Ícones do PrimeReact
import React, { useState } from 'react';

export default function Menu() {
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            window.location.href = `/voting-room/${roomId}`; // Redireciona para a sala de votação com o ID inserido
        } else {
            alert('Por favor, insira um ID de sala válido.');
        }
    };

    // Definindo os itens do menu
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.href = "#home"; }
        },
        {
            label: 'Sobre',
            icon: 'pi pi-fw pi-info-circle',
            command: () => { window.location.href = "#about"; }
        },
        {
            label: 'Contato',
            icon: 'pi pi-fw pi-envelope',
            command: () => { window.location.href = "#contact"; }
        }
    ];

    // Template customizado para incluir a logo e o campo de input
    const start = <img src={logo} alt="Logo da empresa" style={{ marginRight: '10px', height: '40px' }} />;
    const end = (
        <div className="p-inputgroup">
            <input 
                type="text" 
                placeholder="ID da Sala" 
                className="p-inputtext p-component custom-input" 
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)} 
            />
            <button className="p-button p-component custom-button" onClick={handleJoinRoom}>
                <span className="pi pi-sign-in" />
            </button>
        </div>
    );

    return (
        <Menubar model={items} start={start} end={end} />
    );  
};
