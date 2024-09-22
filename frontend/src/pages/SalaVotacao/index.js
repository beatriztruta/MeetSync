import React, { useState, useEffect, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import Menu from "../../components/Menu";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { getRoom } from '../../service/RoomService';
import { postVote } from '../../service/VoteService';
import { isValidValue } from '../../utils/functions';
import "./style.css";

function SalaVotacao() {
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [room, setRoom] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const room = getRoom();
    setRoom(room);

    const times = [
      {
          "timeId": "03b39fec-13a3-4549-a2d0-3f53947fddf2",
          "date": "2024-09-05T00:00:00.000Z",
          "start": "2024-09-05T01:00:00.000Z",
          "end": "2024-09-05T02:00:00.000Z",
          "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269"
      },
      {
        "timeId": "60701341-7316-4d50-86c8-a2d892d75d7f",
        "date": "2024-09-02T00:00:00.000Z",
        "start": "2024-09-02T02:00:00.000Z",
        "end": "2024-09-02T03:00:00.000Z",
        "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269"
      },
      {
          "timeId": "60701241-7316-4d50-86c8-a2d892d75d7f",
          "date": "2024-09-03T00:00:00.000Z",
          "start": "2024-09-03T03:00:00.000Z",
          "end": "2024-09-03T04:00:00.000Z",
          "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269"
      }
    ];
    //times sera substituido por room.Time da req
    //setHorariosDisponiveis(formatTimesFromGet(room?.Time));
    setHorariosDisponiveis(formatTimesFromGet(times));
  }, []);

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Erro', detail:'Por favor, selecione pelo menos um horário.', life: 3000});
  }

  const formatTimesFromGet = (times) => {
    return times.map((item) => {

      const data = new Date(item.date);
      const dia = String(data.getUTCDate()).padStart(2, '0');
      const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
      const ano = data.getUTCFullYear();
  
      const dataFormatada = `${dia}/${mes}/${ano}`;
  
      const horaInicio = new Date(item.start).getUTCHours();
      const horaFim = new Date(item.end).getUTCHours();
  
      const horarioFormatado = `${horaInicio}h-${horaFim}h`;
  
      return {
        id: item.timeId,
        date: dataFormatada,
        time: horarioFormatado
      };
    });
  };

  const toggleHorarioSelection = (id) => {
    setHorariosSelecionados(prevSelectedHorarios =>
      prevSelectedHorarios.includes(id)
        ? prevSelectedHorarios.filter(horarioId => horarioId !== id)
        : [...prevSelectedHorarios, id]
    );
  };

  const handleVotacao = (event) => {
    event.preventDefault();

    if (horariosSelecionados.length === 0 || !isValidValue(nome)) {
      showError();
      return;
    }

    const voteInformation = {
      "userName": nome,
      "times": horariosSelecionados,
    };
    postVote(voteInformation);

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

  const sortedResultados = resultadosTabela.sort((a, b) => b.totalVotos - a.totalVotos);

  return (
    <div>
      <Toast ref={toast} />
      <Menu />
      <div className="flex flex-column align-items-center">
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
                      <h3>{horario.date.split(' ')[0]}</h3>
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
              <i className="pi pi-spin pi-trash"/>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SalaVotacao;
