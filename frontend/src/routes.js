import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial";
import CriarSala from "./pages/CriarSala";

export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path = '/' element = {<PaginaInicial/>}/>
            <Route path = '/criar-sala' element = {<CriarSala/>}/>
        </Routes>
        
        </BrowserRouter>
    );
}