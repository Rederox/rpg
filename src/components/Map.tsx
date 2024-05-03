import React, { useState } from 'react';


interface Map {
  imgSrc: string;
}

function Map({setMap} : any) {
  const maps: Record<string, Map> = {
    "AreneBoss": {imgSrc: "Map/arenaboss.jpg"},
    "AreneFight": {imgSrc: "Map/arenafight.jpg"},
    "AreneRoute": {imgSrc: "Map/areneroute.png"},
    "AreneZero": {imgSrc: "Map/arenezero.png"},
  }

  const [pickedMap, setPickedMap] = useState<Map | null>();
  const [mapName, setMapName] = useState<String>()
  function handlePickMap(map: keyof typeof maps) {
    const chosenMap = maps[map];
    setPickedMap(chosenMap);
    setMap(chosenMap.imgSrc);
    setMapName(map);
  }

    return (
      <div className="box-border border-2 backdrop-blur-md border-white rounded-lg flex flex-col items-center">
            <h1 className=" mt-4 mb-4 me-2 ">Choisissez votre Décor</h1>
            <div className="flex flex-row  justify-start w-full gap-4 mb-2 p-2">
              <div className="row-span-3 flex items-center box-border  p-3">
                <img src={pickedMap?.imgSrc} alt="Pingoléon" className="w-[200px] h-[100px] border-2 border-white rounded-lg mr-2"/>
              </div>
              <div className="row-span-2 col-span-2 flex gap-4 p-3">
                  <div className={`w-32 h-20  border-2 rounded-lg border-black bg-slate-500 ${mapName === "AreneBoss" ? "border-red-800" : "border-black"}`} onClick={() => handlePickMap("AreneBoss")}>
                      <img src="Map/arenaboss.jpg" alt="Boss" className="border-rose-600 h-full rounded-lg"/>
                  </div>
                  <div className={`w-32 h-20  border-2 rounded-lg border-black bg-slate-500 ${mapName === "AreneFight" ? "border-red-800" : "border-black"}`} onClick={() => handlePickMap("AreneFight")}>
                      <img src="Map/arenafight.jpg" alt="Fight" className="border-rose-600 h-full rounded-lg"/>
                  </div>
                  <div className={`w-32 h-20  border-2 rounded-lg border-black bg-slate-500 ${mapName === "AreneRoute" ? "border-red-800" : "border-black"}`} onClick={() => handlePickMap("AreneRoute")}>
                      <img src="Map/areneroute.png" alt="Route" className="border-rose-600 h-full rounded-lg"/>
                  </div>
                  <div className={`w-32 h-20  border-2 rounded-lg border-black bg-slate-500 ${mapName === "AreneZero" ? "border-red-800" : "border-black"}`} onClick={() => handlePickMap("AreneZero")}>
                      <img src="Map/arenezero.png" alt="Zero" className="border-rose-600 h-full rounded-lg"/>
                  </div>
              </div>
            </div>
        </div>
    )
}


export default Map;