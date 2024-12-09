import React, { useRef, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button"; 
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Toast } from "primereact/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { postRoom } from "../../service/RoomService";
import Menu from "../../components/Menu";
import Horarios from "../../components/Horarios";
import { isValidValue, isValidTimesList, createLink, hasDuplicate } from "../../utils/functions";
import "./style.css";

export default function CriarSala() {
    const location = useLocation();
    const { nomeUser } = location.state || {};
    const [nomeAtual, setNomeAtual] = useState(nomeUser);
    const [sala, setSala] = useState({});
    const [datetime24h, setDateTime24h] = useState(null);
    const toast = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (nomeUser) {
            atualizarCampo("name", nomeUser);
        }
    }, [nomeUser]);

    const atualizarCampo = (field, value) => {
        setSala((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const showError = (msg) => {
        toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: msg,
            life: 4000,
        });
    };

    const showSuccess = (msg) => {
        toast.current.show({
            severity: "success",
            summary: "Sucesso",
            detail: msg,
            life: 3000,
        });
    };

    const validateDate = (date) => {
        if (!date || isNaN(new Date(date))) {
            return "A data e hora de finalização da sala não foram informadas ou são inválidas.";
        }
        if (new Date(date) < new Date()) {
            return "A data e hora não podem estar no passado.";
        }
        return null; 
    };

    const handleCalendarChange = (value) => {
        const error = validateDate(value);
        if (error) {
            showError(error);
        } else {
            setDateTime24h(value);
            atualizarCampo("endingAt", value.toISOString());
        }
    };

    const validateData = (sala) => {
        if (!isValidValue(sala.name)) {
            showError("O nome é obrigatório.");
            return false;
        }
        if (!isValidValue(sala.title)) {
            showError("O título da reunião é obrigatório.");
            return false;
        }
        const endingAtError = validateDate(sala.endingAt);
        if (endingAtError) {
            showError(endingAtError);
            return false;
        }
        if (!isValidTimesList(sala.times)) {
            showError("Adicione ao menos um horário válido.");
            return false;
        }
        const timesConverted = convertToISOTimezone(sala.times);
        if (hasDuplicate(timesConverted)) {
            showError("Há horários duplicados.");
            return false;
        }
        return true;
    };

    const submitData = (sala) => {
        if (validateData(sala)) {
            const salaPost = {
                name: sala.name,
                title: sala.title,
                description: sala.description || "",
                times: convertToISOTimezone(sala.times),
                endingAt: sala.endingAt,
            };
            fetchAndSetRoom(salaPost);
        }
    };

    function convertToISOTimezone(dates) {
        return dates.map((dateObj) => ({
            date: new Date(dateObj.date).toISOString(),
            start: new Date(dateObj.start).toISOString(),
            end: new Date(dateObj.end).toISOString(),
        }));
    }

    const fetchAndSetRoom = async (sala) => {
        try {
            const idRoom = await fetchRoom(sala);
            if (idRoom) {
                const link = createLink(idRoom);
                showSuccess("Sala criada com sucesso!");
                navigate(`/sala-votacao/${idRoom}`, { state: { isCriador: true, link: link } });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro desconhecido ao criar a sala.";
            console.error("Erro ao definir a sala:", errorMessage);
            showError(errorMessage);
        }
    };

    async function fetchRoom(sala) {
        try {
            return await postRoom(sala);
        } catch (error) {
            console.error("Erro ao criar a sala:", error);
            throw error;
        }
    }

    addLocale("pt-br", {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
        dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
        dayNamesMin: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
        monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dec"],
        today: "Hoje",
        clear: "Limpar",
    });

    return (
        <div>
            <Toast ref={toast} className="toast" />
            <Menu />
            <div className="flex flex-column align-items-center">
                <div
                    className="fundo-desfocado mt-3 font-bold text-center w-4 md:w-3"
                    style={{ fontSize: "1.5em", padding: "0.5em" }}
                >
                    Criar Sala
                </div>
                <div className="flex text-center m-3 fundo-desfocado grid w-full xl:w-8 lg:w-6">
                    <div className="col-12">
                        <InputText
                            value={nomeAtual}
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Nome*"
                            required
                            onChange={(e) => {
                                setNomeAtual(e.target.value);
                                atualizarCampo("name", e.target.value);
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <InputText
                            className="fundo-desfocado w-9 md:w-7"
                            placeholder="Título da reunião*"
                            required
                            onChange={(e) => atualizarCampo("title", e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <InputTextarea
                            className="fundo-desfocado w-9 md:w-7"
                            style={{ height: "8em" }}
                            placeholder="Descrição"
                            onChange={(e) => atualizarCampo("description", e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <Calendar
                            placeholder="Quando deseja encerrar essa votação?*"
                            value={datetime24h}
                            onChange={(e) => handleCalendarChange(e.value)}
                            className="fundo-desfocado w-9 md:w-7"
                            locale="pt-br"
                            showTime
                            dateFormat="dd/mm/yy"
                            hourFormat="24"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12">
                        <Horarios atualizarHorarios={atualizarCampo} />
                    </div>
                    <div className="col-12 flex flex-row justify-content-center">
                        <Button
                            label="+ Cria Sala"
                            className="create-btn w-6 mt-3"
                            style={{ margin: "0.5em", borderRadius: "5px" }}
                            onClick={() => submitData(sala)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
