import './style.css'

export default function ConteudoPrincipal(){
    return(
        <div className="conteudo-principal">
            <div className="titulo">
            <h1>MeetSync</h1>
            <span>Simplificando a sincronia das suas reuniões!</span>
            </div>

            <div className="formulario-inicio">
                <label htmlFor="name">Seu nome</label>
                <input type="text" placeholder="Digite o seu nome"/>
                <button className="create-btn">+ Criar Sala</button>
            </div>
      </div>
    );
}