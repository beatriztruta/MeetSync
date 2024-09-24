import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from 'primereact/progressspinner';
import "./style.css";

function SalaVotacao() {
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [room, setRoom] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useRef(null);

  const { idRoom } = useParams();
  const location = useLocation();
  const { isCriador, link } = location.state || {};
  const [visibleDialog, setVisibleDialog] = useState(isCriador);

  async function fetchRoom(idRoom) {
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
    
        if (item.vote) {
          const votosPorPessoa = {};
          item.vote.forEach((vote) => {
            if (!votosPorPessoa[vote.userName]) {
              votosPorPessoa[vote.userName] = [vote.timeId];
            } else {
              votosPorPessoa[vote.userName].push(vote.timeId);
            }
          });
          formatResultadosFromGet(votosPorPessoa);
        } 
  
        return {
          id: item.timeId,
          date: dataFormatada,
          time: horarioFormatado
        };
      });
    };

    try {
      const room = await getRoom(idRoom); 
      console.log("Room object:", room); 
      const timesFormatted = formatTimesFromGet(room.Time);
      setHorariosDisponiveis(timesFormatted);
      setRoom(room);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error); 
    }
  }

  useEffect(() => {
    const fetchAndSetRoom = async () => {
      setLoading(true);
      try {
        const roomData = await fetchRoom(idRoom);
        setRoom(roomData);
      } catch (error) {
        console.error("Erro ao definir a sala:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRoom(); 
  }, [idRoom, room]); 


  
  const showError = (typeError) => {
    const msg = typeError === 'horario' ? 'Por favor, selecione pelo menos um horário.' : 'Preencha seu nome';
    toast.current.show({severity:'error', summary: 'Erro', detail: msg, life: 3000});
  }

  const formatResultadosFromGet = (votosPorPessoa) => {

    const lista = [];
    for (const chave in votosPorPessoa) {
      const res = {
        'nome': chave,
        'horarios': votosPorPessoa[chave],
      };
      lista.push(res);
    
    }
    setResultados(lista);
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
      const typeError = horariosSelecionados.length === 0 ? 'horario' : 'nome';
      showError(typeError);
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

  const handleDelete = (event) => {
    event.preventDefault();
    setHorariosSelecionados([]);
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
      {loading
      ? <div className="flex align-items-center justify-content-center" style={{height: '100vh', width: '100vw' }}><ProgressSpinner /></div>
      : <>
      <Toast ref={toast} className='toast'/>
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
          <form>
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
              <div className="flex justify-content-center">
                <button
                  type="button"
                  className="icon-button"
                  onClick={handleDelete}
                  style={{ backgroundColor: "grey" }}
                > 
                  <i className="pi pi-spin pi-trash"/>
                </button>
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
              <button
                className="vote-btn"
                style={{ fontWeight: 'bold' }}
                onClick={(e) => handleVotacao(e)}
              >
                Votar
              </button>
            </div>
          </form>

          <div id="resultados">
            <h2>Resultados</h2>
              <div className="card">
                <DataTable value={sortedResultados} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="horario" header="Horário" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
                    <Column field="totalVotos" sortable header="Total de Votos" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
                    <Column field="pessoas" header="Pessoas" headerStyle={{ background: 'linear-gradient(135deg, #2F4F4F, #4d7979)', color: 'white' }}></Column>
                </DataTable>
            </div>
          </div>
          <div className="icon-buttons">
          </div>
        </div>
      </div>
      {isCriador && <Dialog
        header="Sala de Votação Criada!"
        visible={visibleDialog}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!visibleDialog)
            return;
            setVisibleDialog(false);
          }}
        >
          <p className="m-0">
            Compartilhe o link!<br/>
            {link}   
          </p>
      </Dialog>}
    </>}
    </div>

  );
}

export default SalaVotacao;
