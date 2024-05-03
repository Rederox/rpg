import React, { useEffect, useState } from 'react';
import "./Character.scss"

interface Character {
    name: string;
    type: string;
    imgSrc: string;
}

function Character({setCharacter}:any) {
    const characters: Record<string, Character> = {
      "avatar_blind": {name: "Blindépique", type: "Plante", imgSrc: "sprite/Blindepique.gif"},
      "pingoleo": {name: "Pingoleon", type: "Eau", imgSrc: "sprite/empoleon.gif"},
      "lugulabre": {name: "Lugulabre", type: "Feu", imgSrc: "sprite/Lugulabre.gif"},
      "pikachu": {name: "Pikachu", type: "Electrique", imgSrc: "sprite/pikachu.gif"},
      
    }

    const [pickedCharacter, setPickedCharacter] = useState<Character | null>();
    const [charaterName, setCharaterName] = useState<String>();
    function handlePickCharacter(character: keyof typeof characters) {
      const chosenCharacter = characters[character];
      setPickedCharacter(chosenCharacter);
      setCharacter(chosenCharacter);
      setCharaterName(character);
    }


    return (
        <div className="box-border border-2 backdrop-blur-md border-white rounded-lg flex flex-col items-center">
            <h1 className='mt-4 mb-4 me-2'>Choisissez votre Pokémon</h1>
            <div className="flex flex-row  justify-start w-full gap-4 p-2">
              <div className="row-span-3 flex items-center box-border border-2 border-white rounded-lg p-3">
                  <img src={pickedCharacter?.imgSrc} alt="Pingoléon" className="w-[100px] h-[100px]  pr-2"/>
                  <div>
                    <div className='pl-2'>{pickedCharacter?.name}</div>
                    <div className='pl-2'>{pickedCharacter?.type}</div>
                  </div>
              </div>
              <div className="row-span-2 col-span-2 flex gap-4 p-3">
                  <div className={`w-16 h-16 rounded-full border-2 bg-slate-500 ${charaterName === "avatar_blind" ? "border-red-800" : "border-black"}`} onClick={() => handlePickCharacter("avatar_blind")}>
                      <img src="sprite/avatar_blind.png" alt="Rapasdepic" className="rounded-full  border-rose-600 "/>
                  </div>
                  <div className={`w-16 h-16 rounded-full border-2 bg-slate-500 ${charaterName === "pingoleo" ? "border-red-800" : "border-black"}`} onClick={() => handlePickCharacter("pingoleo")}>
                      <img src="sprite/pingoleo.png" alt="Blindépique" className="rounded-full  border-rose-600"/>
                  </div>
                  <div className={`w-16 h-16 rounded-full border-2 bg-slate-500 ${charaterName === "lugulabre" ? "border-red-800" : "border-black"}`} onClick={() => handlePickCharacter("lugulabre")}>
                      <img src="sprite/lugulabre.png" alt="Lugulabre" className="rounded-full  border-rose-600 "/>
                  </div>
                  <div className={`w-16 h-16 rounded-full border-2 bg-slate-500 ${charaterName === "pikachu" ? "border-red-800" : "border-black"}`} onClick={() => handlePickCharacter("pikachu")}>
                      <img src="sprite/pikachu.png" alt="Pikachu" className="rounded-full  border-rose-600 "/>
                  </div>
              </div>
            </div>
        </div>
    )
}

export default Character;
