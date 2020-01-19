import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function Devform({ onSubmit }) {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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

  async function handleSubmit(e) {
    e.preventDefault();


    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });


    setGithubUsername('');
    setTechs('');
  }


  return (
    <form onSubmit={handleSubmit}>
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
       <button type="submit">Salvar</button>
      </form>
  );
}
