import React, { useState } from 'react';
import './App.scss';
import Character from './components/Character';
import Map from './components/Map';
import Music from './components/Music';

function App() {
  const [character, setCharacter] = useState([])
  const [map, setMap] = useState([])
  const [music, setMusic] = useState([])

  console.log(character, map, music);

  return (
    <div className="h-screen w-screen flex flex-col m-0 bgImg">
      <div className="container mx-auto flex-grow flex flex-col">
        <h1 className="text-center mt-6 mb-6">Choisissez vos options</h1>
        <label className="ml-2" htmlFor="difficulté">Choisissez la difficulté :
          <select id="difficulté">
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
          </select>
        </label>
        <div className='m-1'>
          <Character setCharacter={setCharacter} />
        </div>
        <div className='m-1 '>
          <Map setMap={setMap}/>
        </div>
        <div className='m-1'>
          <Music setMusic={setMusic}/>
        </div>
      </div>
    </div>
  );
  
}



export default App;
