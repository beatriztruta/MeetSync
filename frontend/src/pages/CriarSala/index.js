import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'; 
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { postRoom } from '../../service/RoomService';
import Menu from '../../components/Menu';
import Horarios from '../../components/Horarios';
import { isValidValue, isValidTimesList } from '../../utils/functions';
import './style.css';

export default function CriarSala() {

    const location = useLocation();
    const { nomeUser } = location.state || {}; 
    const [nomeAtual, setNomeAtual] = useState(nomeUser);

    const[sala, setSala] = useState({});
    const [datetime24h, setDateTime24h] = useState(null);
    const toast = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        nomeUser && atualizarCampo('name', nomeUser);
    }, [nomeUser]);

    const atualizarCampo = (field, value) => {
      console.log('aqui');
        setSala(prevUser => ({ ...prevUser, [field]: value }));
      };

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Erro', detail:'Preencha os campos obrigatórios', life: 3000});
    }

    
    function formatTimesForPostRoom(times) {
      const formatted = Object.keys(times).map(dateStr => {
          return Object.keys(times[dateStr]).map(timeId => {
              const { startTime, duration } = times[dateStr][timeId];
              const data = new Date(dateStr);

              console.log(data);
              console.log(data.toISOString());
              const start = new Date(dateStr);
              start.setHours(startTime.code);
              
              const end = new Date(start);
              end.setHours(end.getHours() + parseInt(duration.code));

              return {
                  date: data,
                  start: start,
                  end: end,
              };
          });
      }).flat();

      return formatted;
  }

    const submitData = (sala) => {
        if(isValidValue(sala.name) && isValidValue(sala.title)
        && isValidValue(sala.endingAt) && isValidTimesList(sala.times)) {
          fetchRoom(sala);
        } else {
          showError();
        }

    }
    
    const fetchAndSetRoom = async (sala) => {
      try {
        const idRoom = await fetchRoom(sala);

      } catch (error) {
        console.error("Erro ao definir a sala:", error);
      }
    };

    async function fetchRoom(sala) {
      try {
        const id = await postRoom(sala); 
        console.log("id object:", id); 
        navigate(`/sala-votacao/${id}`, { state: { isCriador: true, link: 'linkk' } });
      } catch (error) {
        console.error("Erro ao criar a sala:", error); 
      }
    }
    
    function formatDate(date) {
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let year = date.getFullYear();
      
      return `${year}-${month}-${day}`;
  }

    addLocale('pt-br', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dec'],
        today: 'Hoje',
        clear: 'Limpar'
    });

    return(
        <div>
            <Toast ref={toast} className='toast'/>
            <Menu/>
            <div className="flex flex-column align-items-center">
                            <div
                                className="fundo-desfocado mt-3 font-bold text-center w-4 md:w-3"
                                style={{
                                    fontSize: '1.5em',
                                    padding: '0.5em',
                                }}
                            >
                                Criar Sala
                            </div>
                <div 
                    className="flex text-center m-3 fundo-desfocado grid w-full xl:w-8 lg:w-6"
                >
                    <div className="col-12">
                        <InputText
                            value={nomeAtual}
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Nome*"
                            required
                            onChange={(e) =>{
                                setNomeAtual(e.target.value);
                                atualizarCampo('name', e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <InputText
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Título da reunião*"
                            required
                            onChange={(e) => atualizarCampo('title', e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <InputTextarea
                            className="fundo-desfocado w-9 md:w-7"
                            style={{ height: '8em' }}
                            placeholder="Descrição"
                            onChange={(e) => atualizarCampo('description', e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <Horarios atualizarHorarios={atualizarCampo} />
                    </div>
                    <div className="col-12">
                        <Calendar
                            placeholder='Quando deseja encerrar essa votação?*'
                            svalue={datetime24h}
                            onChange={(e) => {
                                setDateTime24h(e.value);
                                atualizarCampo('endingAt', formatDate(e.value));
                            }}
                            className="fundo-desfocado w-7 md:w-5"
                            locale="pt-br"
                            showTime
                            dateFormat="dd/mm/yy"
                            hourFormat="24"
                            minDate={new Date()}
                        />
                        
                    </div>
                    <div className="col-12 flex flex-row justify-content-center">
                    <Button
                        label="Cria Sala"
                        className="create-btn w-6 mt-3"
                        style={{ margin: '0.5em' }}
                        onClick={() =>{ 
                            submitData(sala);
                        }}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}