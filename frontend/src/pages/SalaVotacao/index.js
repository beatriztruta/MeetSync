import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCog, faShare } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ListBox } from 'primereact/listbox';
import { InputText } from 'primereact/inputtext';
import Menu from "../../components/Menu";
import "./style.css";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 

function SalaVotacao() {
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);

  const horariosDisponiveis = [
    { label: "01h-02h", value: "01h-02h" },
    { label: "02h-03h", value: "02h-03h" },
    { label: "03h-04h", value: "03h-04h" }
  ];

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

  const resultadosAgrupados = resultados.reduce((acc, resultado) => {
    resultado.horarios.forEach(horario => {
      if (!acc[horario]) {
        acc[horario] = { horario, votos: [] };
      }
      acc[horario].votos.push(resultado.nome);
    });
    return acc;
  }, {});

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
          <InputText
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
            required
            style={{ width: '100%' }} 
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
