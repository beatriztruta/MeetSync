import React, { useState } from "react";
import "./style.css";

export default function OQueE({ isSection }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="section-o-que-e flex flex-column">
      <div className="header" onClick={toggleExpand}>
        <div className="fundo-desfocado-2">
          {isSection && (
            <h2 style={{ fontWeight: "bold" }}>
              O QUE É?{" "}
              <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}>
                {isExpanded ? "▼" : "▶"}
              </span>
            </h2>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="fundo-desfocado-2 content">
          <h3>
            Nosso sistema foi projetado para transformar a maneira como você organiza encontros em grupo,
            tornando o processo mais eficiente e livre de complicações. Com apenas alguns passos simples,
            você pode criar uma sala para seu evento ou reunião. Em seguida, compartilhe o link gerado com
            todos os participantes, permitindo que cada um vote nos horários que melhor se ajustam à sua agenda.
            <br />
            Com nossa solução, a organização de encontros é fácil, rápida e descomplicada. Concentre-se no que realmente importa – a sua reunião – enquanto nós cuidamos do resto. Aproveite a eficiência e a simplicidade que nosso sistema oferece e experimente uma nova forma de organizar reuniões.
          </h3>
        </div>
      )}
    </div>
  );
}
