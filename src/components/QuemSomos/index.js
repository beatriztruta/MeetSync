import React, { useState } from "react";
import "./style.css";

export default function QuemSomos() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

  return (
    <div className="section-quem-somos flex flex-column">
      <div className="header" onClick={toggleExpand}>
        <div className="fundo-desfocado-2">
            <h2>
              Quem Somos?{" "}
              <span className={`toggle-icon ${isExpanded ? "expanded" : ""}`}>
              {isExpanded ? <i className="pi pi-angle-down" style={{ fontSize: '2rem' }}></i> : <i className="pi pi-angle-right" style={{ fontSize: '2rem' }}></i>}
              </span>
            </h2>
        </div>
      </div>
      {isExpanded && (
        <div className="fundo-desfocado-2 quem-somos-container">
          <p className="descricao">
            Somos um grupo de graduandos em Ciência da Computação pela Universidade Federal de Campina Grande (UFCG) que decidiu desenvolver este sistema para simplificar a organização de reuniões e eventos. O projeto teve início na disciplina de Projeto 1 e foi aperfeiçoado e concluído durante Projeto 2, como parte do nosso aprendizado e desejo de criar algo útil para facilitar a vida das pessoas.
          </p>
          <p className="descricao">
            Nosso time é formado por integrantes dedicados. Confira quem somos:
          </p>
          <ul className="integrantes">
            <li>
              <strong>Aline de Brito das Neves (Frontend)</strong> 
            </li>
            <li>
              <strong>Ana Beatriz da Silva Truta (Frontend)</strong> 
            </li>
            <li>
              <strong>Lívia Aniely de Oliveira Almeida (Frontend)</strong> 
            </li>
            <li>
              <strong>Iago Henrique de Souza Silva (Backend)</strong>
            </li>
            <li>
              <strong>Matheus Victor Pereira (Backend)</strong> 
            </li>
            <li>
              <strong>Joab Cesar Morais Pinheiro (Backend)</strong> 
            </li>
          </ul>
          <p className="descricao">
            Somos um time cheio de personalidade e acreditamos que, mesmo entre
            desafios e boas risadas, criamos algo que pode realmente fazer a
            diferença para você.
          </p>
        </div>
      )}
    </div>
  );
}