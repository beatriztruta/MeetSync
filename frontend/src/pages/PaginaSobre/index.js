import ComoUsar from "../../components/ComoUsar";
import Menu from "../../components/Menu";
import OQueE from "../../components/OQueE";

export default function PaginaSobre() {
    return(
        <>
            <Menu/>
            <div className="flex flex-column align-items-center">
                <div
                    className="fundo-desfocado-2 mt-3 font-bold text-center w-4 md:w-3"
                    style={{
                        fontSize: "1.5em",
                        padding: "0.5em",
                        marginBottom: "1.5em"
                    }}
                >
                    Como Usar:
                </div>
                <OQueE/>
                <ComoUsar/>
            </div>
        </>
    );
}