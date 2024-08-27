import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCog, faShare } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ListBox } from 'primereact/listbox'; // Certifique-se de que o ListBox está importado corretamente
import Menu from "../../components/Menu";
import "./style.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Estilos do PrimeReact
import "primereact/resources/primereact.min.css"; // Componentes principais do PrimeReact


function SalaVotacao() {
  // Estados para armazenar o nome, os horários selecionados e os resultados
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);

  const horariosDisponiveis = [
    { label: "01h-02h", value: "01h-02h" },
    { label: "02h-03h", value: "02h-03h" },
    { label: "03h-04h", value: "03h-04h" }
  ];

  // Função chamada quando o formulário é enviado
  const handleVotacao = (event) => {
    event.preventDefault();

    if (horariosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um horário.");
      return;
    }

    // Adicionar o voto aos resultados
    setResultados((prevResultados) => [
      ...prevResultados,
      { nome, horarios: [...horariosSelecionados] },
    ]);

    // Limpar os campos após o voto
    setNome("");
    setHorariosSelecionados([]);
  };

  // Função para lidar com o clique da lixeira
  const handleDelete = () => {
    setResultados([]); // Limpa todos os resultados ao clicar no botão de lixeira
  };

  // Agrupar votos por horário
  const resultadosAgrupados = resultados.reduce((acc, resultado) => {
    resultado.horarios.forEach(horario => {
      if (!acc[horario]) {
        acc[horario] = { horario, votos: [] };
      }
      acc[horario].votos.push(resultado.nome);
    });
    return acc;
  }, {});

  // Convertendo o objeto em uma lista de dados para o DataTable
  const resultadosTabela = Object.keys(resultadosAgrupados).map((horario) => ({
    horario,
    totalVotos: resultadosAgrupados[horario].votos.length,
    pessoas: resultadosAgrupados[horario].votos.join(", "),
  }));

  return (
    <div className="flex flex-column align-items-center">
      <Menu />
      <div
        className="fundo-desfocado"
        style={{
          marginTop: "0.5em",
          padding: "0.5em",
          width: "20%",
          fontSize: "1.5em",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Sala de Votação
      </div>
      <div
        className="fundo-desfocado flex flex-column align-items-center w-full xl:w-8 lg:w-6"
        style={{ margin: "1em", padding: "1em" }}
      >
        <form onSubmit={handleVotacao}>
          <div className="horarios">
            <label htmlFor="horarios">Selecione os horários:</label>
            <ListBox
              multiple
              value={horariosSelecionados}
              options={horariosDisponiveis}
              onChange={(e) => setHorariosSelecionados(e.value)}
              style={{ width: '15rem' }}
            />
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
          <DataTable value={resultadosTabela}>
            <Column field="horario" header="Horário" />
            <Column field="totalVotos" header="Total de Votos" />
            <Column field="pessoas" header="Pessoas que Votaram" />
          </DataTable>
        </div>

        <div className="icon-buttons">
          <button
            className="icon-button"
            onClick={handleDelete}
            style={{ backgroundColor: "grey" }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="icon-button" style={{ backgroundColor: "grey" }}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button className="icon-button" style={{ backgroundColor: "grey" }}>
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalaVotacao;
