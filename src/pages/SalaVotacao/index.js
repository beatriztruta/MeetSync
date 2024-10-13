import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import Menu from "../../components/Menu";
import "primereact/resources/themes/saga-blue/theme.css"; 
import "primereact/resources/primereact.min.css"; 
import { Toast } from "primereact/toast";
import { getRoom } from "../../service/RoomService";
import { postVote } from "../../service/VoteService";
import { isValidValue } from "../../utils/functions";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import "./style.css";

function SalaVotacao() {
  const [nome, setNome] = useState("");
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [room, setRoom] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useRef(null);
  const toastCopied = useRef(null);

  const { idRoom } = useParams();
  const location = useLocation();
  const { isCriador, link } = location.state || {};
  const [visibleDialog, setVisibleDialog] = useState(isCriador);

  async function fetchRoom(idRoom) {
    const formatTimesFromGet = (times) => {
      return times.map((item) => {
  
        const data = new Date(item.date);
        const dia = String(data.getUTCDate()).padStart(2, "0");
        const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
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
      let room = await getRoom(idRoom); 
      room = {
        "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269",
        "endingAt": "2024-10-24T00:00:00.000Z",
        "createdAt": "2024-09-18T00:22:10.796Z",
        "updatedAt": "2024-09-18T00:22:10.796Z",
        "title": "oi",
        "description": "sim",
        "Time": [
            {
                "timeId": "03b39fec-13a3-4549-a2d0-3f53947fddf2",
                "date": "2024-09-02T00:00:00.000Z",
                "start": "2024-09-02T08:00:00.000Z",
                "end": "2024-09-02T10:00:00.000Z",
                "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269"
            },
            {
                "timeId": "60701341-7316-4d50-86c8-a2d892d75d7f",
                "date": "2024-09-03T00:00:00.000Z",
                "start": "2024-09-03T13:00:00.000Z",
                "end": "2024-09-03T15:00:00.000Z",
                "roomId": "35db430c-b4df-4ddf-9a2b-738f454d3269"
            }
        ]
    };
      const timesFormatted = formatTimesFromGet(room.Time);
      setHorariosDisponiveis(timesFormatted);
      setRoom(room);
    } catch (error) {
      console.error("Erro ao buscar a sala:", error); 
    }
  }

  const handleCopyLink = (infoCopiada) => {
    navigator.clipboard.writeText(infoCopiada).then(() => {
      showInfoCopied("Link copiado!");
    }).catch(err => {
      console.error("Falha ao copiar a info: ", err);
    });
  };

  const handleCopyId = (infoCopiada) => {
    navigator.clipboard.writeText(infoCopiada).then(() => {
      showInfoCopied("ID copiado!");
    }).catch(err => {
      console.error("Falha ao copiar a info: ", err);
    });
  };

  useEffect(() => {
    const fetchAndSetRoom = async () => {
      setLoading(true);
      try {
        await fetchRoom(idRoom);
      } catch (error) {
        console.error("Erro ao definir a sala:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetRoom(); 
  }, [idRoom]); 


  const showError = (typeError) => {
    let msg = typeError === "horario" 
              ? "Por favor, selecione pelo menos um horário." 
              : typeError === "nome repetido" 
                ? "Esse usuário já votou. Insira outro nome" 
                :  "Preencha seu nome";
    toast.current.show({severity:"error", summary: "Erro", detail: msg, life: 3000});
  }

  const showInfoCopied = (msg) => {
    toastCopied.current.show({severity:"success", summary: "Sucesso!", detail: msg, life: 3000});
}

  const formatResultadosFromGet = (votosPorPessoa) => {

    const lista = [];
    for (const chave in votosPorPessoa) {
      const res = {
        "nome": chave,
        "horarios": votosPorPessoa[chave],
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

  const validNome = (nome) => {
    return !resultados.some(item => item.nome === nome);
  };

  const handleVotacao = (event) => {
    event.preventDefault();

    if (!validNome(nome)) {
      showError("nome repetido");
    } else {
      if (horariosSelecionados.length === 0 || !isValidValue(nome)) {
        const typeError = horariosSelecionados.length === 0 ? "horario" : "nome";
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
    }
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
      ? <div className="flex align-items-center justify-content-center" style={{height: "100vh", width: "100vw" }}><ProgressSpinner /></div>
      : <>
      <Toast ref={toast} className="toast"/>
      <Menu />
      <div className="flex flex-column align-items-center">
        <div
          className="fundo-desfocado"
          style={{
            marginTop: "0.5em",
            padding: "0.5em",
            width: "30%",
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
          <div className="flex flex-column align-items-center w-full">
            <h3>Titulo: {room?.title}</h3>
            {room?.description ?
              <>
                <Divider/>
                <p><strong>Descrição:</strong> {room.description}</p>
              </>
            : ''}
            <Divider/>
          </div>
          {room?.endingAt > new Date().toISOString() && 
          <form>
            <div className="horarios">
              <label htmlFor="horarios" style={{ textAlign: "center", color: "white", marginTop: '10px' }}>Selecione os horários:</label>
              <div className="cards-container">
                {horariosDisponiveis.map((horario) => (
                  <div
                    key={horario.id}
                    className={`card ${horariosSelecionados.includes(horario.id) ? "selected" : ""}`}
                    onClick={() => toggleHorarioSelection(horario.id)}
                  >
                    <div className="card-content">
                      <h3>{horario.date.split(" ")[0]}</h3>
                      <p>{horario.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-content-center">
                <Button
                  type="button"
                  className="icon-button"
                  onClick={handleDelete}
                  style={{ backgroundColor: "grey" }}
                > 
                  <i className="pi pi-spin pi-trash"/>
                </Button>
              </div>
            </div>

            <label htmlFor="nome">Nome:</label>
            <InputText
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              style={{ width: "100%" }} 
            />

            <div>
              <Button
                className="vote-btn"
                style={{ fontWeight: "bold" }}
                onClick={(e) => handleVotacao(e)}
              >
                Votar
              </Button>
            </div>
          </form>}

          <div id="resultados" className="w-full">
            <h2 style={{textAlign: 'center'}}>Resultados</h2>
              <div className="card-resultados">
                <div className="card-container">
                  {sortedResultados.length > 0 ? (
                    sortedResultados.map((item, index) => {
                      const [data, horas] = item.horario.split(" - ");

                      return (<div key={index} className="card-res">
                        <div className="flex flex-row justify-content-between align-items-center">
                          <div className="tag-badge">Horário</div>
                          <h4 className="card-title">
                            <span >{data} |{' '}</span>
                            <span>{horas}</span>
                          </h4>
                        </div>
                        <div className="flex flex-row justify-content-between align-items-center">
                          <div className="tag-badge">Total de Votos</div>
                          <p className="card-info">{item.totalVotos}</p>
                        </div>
                        <div className="flex flex-row justify-content-between align-items-center">
                          <div className="tag-badge">Pessoas</div>
                          <p className="card-info">{item.pessoas}</p>
                        </div>
                      </div>);
                    })
                  ) : (
                    <div className="card-res no-result">
                      <h4>Nenhum resultado disponível</h4>
                      <p>A votação não possui votos.</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
          <div className="icon-buttons">
          </div>
        </div>
      </div>
      {isCriador && <Dialog
        header="Sala de Votação Criada!"
        visible={visibleDialog}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => {
          if (!visibleDialog)
            return;
            setVisibleDialog(false);
          }}
        >
          <div className="m-0 flex flex-column">
            <strong>Compartilhe o link!</strong><br/>
            <div className="flex flex-row align-items-center mb-2">
              <a 
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "0.5em" }}
              >
                {link}
              </a>  
              <Button 
                onClick={() => handleCopyLink(link)}
                className="basic-btn"
                style={{ padding: "0.5em" }}
              >
                  <i className="pi pi-clipboard"></i>
              </Button>
            </div>
            <strong>Ou envie o ID da sala para as pessoas:</strong>
            <div className="flex flex-row align-items-center">
              <p style={{ marginRight: "0.5em" }}>{idRoom}</p>
              <Button 
                onClick={() => handleCopyId(idRoom)} 
                className="basic-btn"
                style={{ padding: "0.5em" }}
              >
                <i className="pi pi-clipboard"></i>
              </Button>
            </div>
          </div>
      </Dialog>}
    </>}
    <Toast ref={toast} className="toast" />
    <Toast ref={toastCopied} className="toast" />
    </div>

  );
}

export default SalaVotacao;
