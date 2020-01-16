import React, {useState, useEffect} from 'react';

export default function DevForm({onSubmit}) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setTechs('');
    setGithubUsername('');
  }

  return (
    <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">GitHub User</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              value = {github_username}
              onChange = {e => setGithubUsername(e.target.value)}
              required
            />
          </div>
         
          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input
              type="text"
              name="techs"
              id="techs"
              value = {techs}
              onChange = {e => setTechs(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salve</button>
        </form>
  );
}
