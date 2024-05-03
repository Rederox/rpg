import React, { useState } from 'react';
import "./Music.scss"

const Music = ({setMusic} : any) => {
  const [selectedAudio, setSelectedAudio] = useState('');
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [musicName, setMusicName] = useState<String>()

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAudio(event.target.value);
  };

  const toggleAudio = (audioSrc: string) => {
    if (selectedAudio && audioPlayer) {
      if (!isPlaying) {
        audioPlayer.src = selectedAudio;
        audioPlayer.play();
        setMusic(audioSrc);
        setMusicName(audioSrc);
        
      } else {
        audioPlayer.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const togglePlayOnTitleClick = (audioSrc: string) => {
    setSelectedAudio(audioSrc);
    toggleAudio(audioSrc);
  };


  return (
    <div className="box-border border-2 backdrop-blur-md border-white rounded-lg flex flex-col items-center">
      <h1 className='mt-4 mb-4 me-2 '>Choisissez votre Musique</h1>
      <div className="flex flex-row  justify-center w-full gap-4 mb-2">
        <div className="row-span-4 col-span-1 flex gap-4">
          <input type="radio" id="bossFinal" name="audio" value="/music/123. Battle! (Final Boss).mp3" onChange={handleAudioChange} checked={selectedAudio === "/music/123._Battle!_(Final Boss).mp3"} className="radio-input visually-hidden" />
          <label htmlFor="bossFinal" className={`radio-label w-20 h-20 border-2 border-black rounded-full flex justify-center items-center ${musicName === "/music/123._Battle!_(Final Boss).mp3" ? "border-red-800" : "border-black"}`} onClick={() => togglePlayOnTitleClick("/music/123._Battle!_(Final Boss).mp3")}>Boss Final</label>
  
          <input type="radio" id="areneZero" name="audio" value="/music/118. Area Zero.mp3" onChange={handleAudioChange} checked={selectedAudio === "/music/118._Area_Zero.mp3"} className="radio-input visually-hidden" />
          <label htmlFor="areneZero" className={`radio-label w-20 h-20 border-2 border-black rounded-full text-center flex justify-center items-center ${musicName === "/music/118._Area_Zero.mp3" ? "border-red-800" : "border-black"}`} onClick={() => togglePlayOnTitleClick("/music/118._Area_Zero.mp3")}>Arene Zero</label>
  
          <input type="radio" id="conseil4" name="audio" value="/music/229 Battle! Elite Four.mp3" onChange={handleAudioChange} checked={selectedAudio === "/music/229_Battle!_Elite_Four.mp3"} className="radio-input visually-hidden" />
          <label htmlFor="conseil4" className={`radio-label w-20 h-20 border-2 border-black rounded-full flex justify-center items-center ${musicName === "/music/229_Battle!_Elite_Four.mp3" ? "border-red-800" : "border-black"}`} onClick={() => togglePlayOnTitleClick("/music/229_Battle!_Elite_Four.mp3")}>Conseil 4</label>
  
          <input type="radio" id="maitreLigue" name="audio" value="/music/2-67 Battle! Champion.mp3" onChange={handleAudioChange} checked={selectedAudio === "/music/2-67_Battle!_Champion.mp3"} className="radio-input visually-hidden" />
          <label htmlFor="maitreLigue" className={`radio-label w-20 h-20 border-2 border-black rounded-full text-center flex justify-center items-center ${musicName === "/music/2-67_Battle!_Champion.mp3" ? "border-red-800" : "border-black"}`} onClick={() => togglePlayOnTitleClick("/music/2-67_Battle!_Champion.mp3")}>Maitre de ligue</label>
  
          <audio ref={setAudioPlayer} />
        </div>
      </div>
    </div>
  );
};

export default Music;
