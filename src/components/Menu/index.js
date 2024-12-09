import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo3.png";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import "./style.css";

export default function Menu({ isPaginaInicial }) {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const toast = useRef(null);

    const showError = () => {
        toast.current.show({severity:"error", summary: "Erro", detail:"Por favor, insira um ID de sala válido", life: 3000});
    }

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            navigate(`/sala-votacao/${roomId}`);
        } else {
            showError();
        }
    };

    const items = [
        {
            label: "Home",
            icon: "pi pi-fw pi-home",
            command: () => { navigate("/"); }
        },
        {
            label: "Criar Sala",
            icon: "pi pi-fw pi-info-circle",
            command: () => { navigate("/criar-sala"); }
        },
    ];

    const start = <div className="flex"><a href="/"><img src={logo} alt="Logo" style={{ marginRight: "5px", height: "70px" }} /></a><h3 style={{ marginTop: "25px", marginRight: "10px", fontWeight: "500" }}>MeetSync</h3></div>;
    
    const end = (
        isPaginaInicial
        ? <div className="p-inputgroup">
            <Toast ref={toast} className="toast" position="top-left" />
            <InputText 
                placeholder="ID da Sala" 
                className="p-inputtext custom-input" 
                onChange={(e) => setRoomId(e.target.value)} 
            />
            <button
                className="p-button custom-button"
                onClick={handleJoinRoom}
            >
                <span className="pi pi-sign-in"  />
            </button>
        </div>
        : ""
    );

        return (
            <Menubar
            model={items}
            start={start}
            end={end}
            style={{ background: "rgba(47, 79, 79)", boxShadow: "0 0 0 0", borderRadius: "0" }}
        />
    );  
};
