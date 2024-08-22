import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCog, faShare } from "@fortawesome/free-solid-svg-icons"; // Certifique-se de que os ícones corretos estão importados

function App() {
  // Estados para armazenar o nome, o horário selecionado e os resultados
  const [nome, setNome] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [resultados, setResultados] = useState([]);

  // Função chamada quando o formulário é enviado
  const handleVotacao = (event) => {
    event.preventDefault();

    if (!horarioSelecionado) {
      alert("Por favor, selecione um horário.");
      return;
    }

    // Adicionar o voto aos resultados
    setResultados((prevResultados) => [
      ...prevResultados,
      { nome, horario: horarioSelecionado },
    ]);

    // Limpar os campos após o voto
    setNome("");
    setHorarioSelecionado("");
  };

  // Função para lidar com o clique da lixeira
  const handleDelete = () => {
    setResultados([]); // Limpa todos os resultados ao clicar no botão de lixeira
  };

  return (
    <div className="voting-container">
      <h1>Votação de Horários</h1>
      <form onSubmit={handleVotacao}>
        <div className="horarios">
          <label>
            <input
              type="radio"
              name="horario"
              value="01h-02h"
              checked={horarioSelecionado === "01h-02h"}
              onChange={(e) => setHorarioSelecionado(e.target.value)}
            />
            01h-02h
          </label>
          <label>
            <input
              type="radio"
              name="horario"
              value="02h-03h"
              checked={horarioSelecionado === "02h-03h"}
              onChange={(e) => setHorarioSelecionado(e.target.value)}
            />
            02h-03h
          </label>
          <label>
            <input
              type="radio"
              name="horario"
              value="03h-04h"
              checked={horarioSelecionado === "03h-04h"}
              onChange={(e) => setHorarioSelecionado(e.target.value)}
            />
            03h-04h
          </label>
        </div>

        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          required
        />

        <div>
          <button className="create-btn">Votar</button>
        </div>
      </form>

      <div id="resultados">
        <h2>Resultados</h2>
        <ul>
          {resultados.map((resultado, index) => (
            <li key={index}>
              {resultado.nome} votou no horário: {resultado.horario}
            </li>
          ))}
        </ul>
      </div>

      {/* Botões de ícones */}
      <div className="icon-buttons">
        <button className="icon-button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button className="icon-button">
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  );
}

export default App;