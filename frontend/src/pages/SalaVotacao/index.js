import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCog, faShare } from "@fortawesome/free-solid-svg-icons";
import { InputText } from 'primereact/inputtext';
import Menu from "../../components/Menu";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./style.css";

function SalaVotacao() {
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);

  const horariosDisponiveis = [
    { id: 1, date: '2024-09-01', time: '01h-02h' },
    { id: 2, date: '2024-09-02', time: '02h-03h' },
    { id: 3, date: '2024-09-03', time: '03h-04h' },
  ];

  const toggleHorarioSelection = (id) => {
    setHorariosSelecionados(prevSelectedHorarios =>
      prevSelectedHorarios.includes(id)
        ? prevSelectedHorarios.filter(horarioId => horarioId !== id)
        : [...prevSelectedHorarios, id]
    );
  };

  const handleVotacao = (event) => {
    event.preventDefault();

    if (horariosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um horário.");
      return;
    }

    setResultados((prevResultados) => [
      ...prevResultados,
      { nome, horarios: [...horariosSelecionados] },
    ]);

    setNome("");
    setHorariosSelecionados([]);
  };

  const handleDelete = () => {
    setResultados([]);
  };

  function formatDate(date) {
    let dados =  date.split('-');
    return `${dados[2]}/${dados[1]}/${dados[0]}`;
}

  const resultadosAgrupados = resultados.reduce((acc, resultado) => {
    resultado.horarios.forEach(horario => {
      const horarioData = horariosDisponiveis.find(h => h.id === horario);
      const label = `${horarioData.date} - ${horarioData.time}`;
      if (!acc[label]) {
        acc[label] = { horario: label, votos: [] };
      }
      acc[label].votos.push(resultado.nome);
    });
    return acc;
  }, {});

  const resultadosTabela = Object.keys(resultadosAgrupados).map((horario) => ({
    horario,
    totalVotos: resultadosAgrupados[horario].votos.length,
    pessoas: resultadosAgrupados[horario].votos.join(", "),
  }));

  // Ordene os resultados por total de votos (ranking)
  const sortedResultados = resultadosTabela.sort((a, b) => b.totalVotos - a.totalVotos);

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
            <label htmlFor="horarios" style={{ textAlign: 'center', color: 'white' }}>Selecione os horários:</label>
            <div className="cards-container">
              {horariosDisponiveis.map((horario) => (
                <div
                  key={horario.id}
                  className={`card ${horariosSelecionados.includes(horario.id) ? 'selected' : ''}`}
                  onClick={() => toggleHorarioSelection(horario.id)}
                >
                  <div className="card-content">
                    <h3>{formatDate(horario.date.split(' ')[0])}</h3>
                    <p>{horario.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <label htmlFor="nome">Nome:</label>
          <InputText
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
            style={{ width: '100%' }} 
          />

          <div>
            <button className="vote-btn" style={{ fontWeight: 'bold' }}>Votar</button>
          </div>
        </form>

        <div id="resultados">
          <h2>Resultados</h2>
            <div className="card">
              <DataTable value={sortedResultados} tableStyle={{ minWidth: '50rem' }}>
                  <Column field="horario" header="Horário" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
                  <Column field="totalVotos" header="Total de Votos" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
                  <Column field="pessoas" header="Pessoas" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
              </DataTable>
          </div>
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
