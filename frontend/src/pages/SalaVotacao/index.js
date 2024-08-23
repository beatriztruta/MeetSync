import React, { useState } from "react";
import { ListBox } from 'primereact/listbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCog, faShare } from "@fortawesome/free-solid-svg-icons"; // Certifique-se de que os ícones corretos estão importados
import Menu from "../../components/Menu";
import "./style.css";

function SalaVotacao() {
  // Estados para armazenar o nome, o horário selecionado e os resultados
  const [nome, setNome] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [resultados, setResultados] = useState([]);

  const duracoes = ['30 minutos', '1 hora', '2 horas', '3 horas'];

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
    <div className="flex flex-column align-items-center">
      <Menu/>
      <div className="fundo-desfocado"
        style={{
                marginTop: '0.5em',
                padding: '0.5em', 
                width: '20%',
                fontSize: '1.5em',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Sala de Votação
      </div>
      <div
        className="fundo-desfocado flex flex-column align-items-center w-full xl:w-8 lg:w-6"
        style={{ margin: '1em', padding: '1em' }}
      >
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
          <button className="vote-btn">Votar</button>
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

      <div className="icon-buttons">
        <button className="icon-button" onClick={handleDelete} style={{ backgroundColor: "grey"}}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="icon-button" style={{ backgroundColor: "grey"}}>
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button className="icon-button" style={{ backgroundColor: "grey"}}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
    </div>
    
  );
}

export default SalaVotacao;
