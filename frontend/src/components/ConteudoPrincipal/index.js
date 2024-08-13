import './style.css'

export default function ConteudoPrincipal(){
    return(
        <div className="form-group">
            <h1>MeetSync</h1>
            <label htmlFor="name">Seu nome</label>
            <input type="text" id="name" name="name" />
            <button className="create-btn">+ criar</button>
      </div>
    );
}