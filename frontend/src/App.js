import './App.css';

function App() {
  return (
    <div className="container">
      <div className="header"></div>
      <ul>
        <li><a href="#inicio">Início</a></li>
        <li><a href="#criar-sala">Criar Sala</a></li>
        <li><a href="#votar">Votar</a></li>
      </ul>
      <h1>MeetSync</h1>
      <div className="form-group">
        <label htmlFor="name">Seu nome</label>
        <input type="text" id="name" name="name" />
      </div>
      <button className="create-btn">+ criar</button>
      <div className="section">
        <h2>O QUE É?</h2>
      </div>
      <div className="section">
        <h2>COMO USAR</h2>
      </div>
    </div>
  );
}

export default App;

