import React, { useState } from "react";
import { Image } from "primereact/image";
import unico from "../../assets/imgs/comousar/unico.png";
import "./style.css";

export default function ComoUsar({ isSection }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className="section-como-usar">
            <div className="header" onClick={toggleExpand}>
                {isSection && (
                    <h2 className="fundo-desfocado-2 p-3">
                        COMO USAR:
                        <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}>
                            {isExpanded ? "▼" : "▶"}
                        </span>
                    </h2>
                )}
            </div>
            {isExpanded && (
                <div className="fundo-desfocado-2 content-block">
                    <div className="image-container">
                        <Image
                            src={unico}
                            alt="passo único"
                            width="300"
                            style={{ boxShadow: "0 0 0 0" }}
                        />
                    </div>
                    <div className="text-container">
                        <h2>
                            Para usar o MeetSync, comece criando uma sala no site,
                            inserindo seu nome, adicione título e descrição (se quiser),
                            quando termina a votação adicione os horários desejados. Então,
                            basta clicar em Criar Sala!<br />
                            Em seguida, compartilhe o link gerado
                            no grupo de conversa com as pessoas a quem você deseja se
                            reunir. Os participantes podem acessar o link e votar nos
                            horários que estão disponíveis. O sistema exibirá os horários
                            mais votados, ajudando a identificar a melhor opção para todos!
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
}
