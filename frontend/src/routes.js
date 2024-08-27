import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial";
<<<<<<< HEAD
import CriarSala from "./pages/CriarSala";
=======
>>>>>>> a0af2b2 (config: adiciona o mapeamento de rotas da aplicacao)

export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path = '/' element = {<PaginaInicial/>}/>
<<<<<<< HEAD
            <Route path = '/criar-sala' element = {<CriarSala/>}/>
=======
>>>>>>> a0af2b2 (config: adiciona o mapeamento de rotas da aplicacao)
        </Routes>
        
        </BrowserRouter>
    );
}