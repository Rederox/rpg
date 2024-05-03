import React, { useState } from 'react';
import './App.scss';
import Character from './components/Character';
import Map from './components/Map';
import Music from './components/Music';
import Arena from "./components/Arena/Arena";


function App() {
  const [character, setCharacter] = useState('')
  const [map, setMap] = useState('')
  const [music, setMusic] = useState('')
  const [difficulty, setDifficulty] = useState('facile')
  const [startGame, setStartGame] = useState(false)

  function handleDifficulty(difficulty: string) {
    setDifficulty(difficulty);
  }

  function handleStartGame() {
    setStartGame(true);
  }

  function handleEndGame() { 
    setStartGame(false);
  }

  console.log(character, map, music, difficulty);

  return (
    <>
    { startGame ? <Arena character={character} map={map} music={music} difficulty={difficulty} endGame={handleEndGame}  />:(
      <div className="h-[100vh] w-full flex flex-row justify-center items-center m-0 ">
        <div className="container flex-grow flex flex-col bgImg h-[80vh] w-[80vw] rounded-lg">
          <h1 className="text-center text-2xl mt-6 mb-6 custom-font">Choisissez vos options</h1>
          <label className="ml-2" htmlFor="difficulté">Choisissez la difficulté :
            <select id="difficulté" name="difficulté" onChange={(e) => handleDifficulty(e.target.value)}>
                <option value="facile" selected>Facile</option>
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
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg m-4" onClick={handleStartGame}>Jouer</button>
        </div>
      </div>
    )}
    </>
  );
  
}



export default App;