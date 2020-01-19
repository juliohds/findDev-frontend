import React, { useEffect, useState } from 'react';
import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import api from './services/api'; 

function App() {

  const [devs, setDevs] = useState([]);
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    async function loadDev() {
      const response = await api.get('devs');
      setDevs(response.data);
    }
    loadDev();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position)=> {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(position)
      }, (err) => {
        console.log(err)
      }, {
      timeout: 30000
      }
    )
  }, []);

  async function handleAddDev(e){
    e.preventDefault();

    const response = await api.post('devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    setGithubUsername('');
    setTechs('');
    setDevs([...devs, response.data]);
  }

  return (
   <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" onChange={(e) => setGithubUsername(e.target.value)} value={github_username}  id="github_username" required />
        </div>
        
        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" onChange={(e) => setTechs(e.target.value)} value={techs}  id="techs" required />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" onChange={(e) => setLatitude(e.target.value)} type="number" value={latitude} id="latitude" required />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude"onChange={(e) => setLongitude(e.target.value)}  id="longitude" type="number" value={longitude} required />
          </div>
       </div>
       <button type="submit" onClick={handleAddDev}>Salvar</button>
      </form>
    </aside>

    <main>
      <ul>
        {devs.map(dev => (
          <li key={dev._id} className="dev-item">
          <header>
            <img src={dev.avatar_url} alt={dev.name} />
            <div className="user-info">
              <strong>{dev.name}</strong>
              <span>{dev.techs.join(',')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
        ))}
      </ul>
    </main>
   </div>
  );
}

export default App;
