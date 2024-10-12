import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { hashToId } from "../../utils/functions";
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
            const idFromHash = hashToId(roomId);
            navigate(`/sala-votacao/${idFromHash}`);
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
            label: "Sobre",
            icon: "pi pi-fw pi-info-circle",
            command: () => { navigate("/sobre"); }
        },
    ];

    const start = <a href="/"><img src={logo} alt="Logo" style={{ marginRight: "10px", height: "70px" }} /></a>;
    
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
            style={{ backgroundColor: "#2f4f4f", boxShadow: "0 0 0 0", borderRadius: "0" }}
        />
    );  
};
