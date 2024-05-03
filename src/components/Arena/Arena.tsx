import React, { useState, useEffect } from 'react';
import './Arena.scss';
import { Battle } from '../../entities/Battle';
import { HistoryEntry, Monster, BattleHistoryEntry } from '../../entities/Monster';
import { Skill, SkillType } from '../../entities/Skill';
import Pokemon from './pokemon/pokemon';
import LogsAttack from './logs/logsAttack';
import Element from '../../entities/Elements';
import { bossByDifficulty, tradTpyesTOfrench, monsterByName, getSpiritGifByName } from '../../utils/functions';
import BattleControls from './BattleControls';

interface ArenaProps {
    character: string;
    map: string;
    music: string;
    difficulty: string;
    endGame: any
}

const Arena: React.FC<ArenaProps> = ({ character, map, music, difficulty, endGame }) => {
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    console.log("character ==============================", character)
    const toggleAudio = (audioSrc: string) => {
        if (audioPlayer) {
            if (!isPlaying) {
                audioPlayer.src = music;
                audioPlayer.play();

            } else {
                audioPlayer.pause();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioPlayer) {
            audioPlayer.src = music;
            audioPlayer.play();
        }
    }, [audioPlayer, music]);


    const muteAndUnmute = () => {
        if (audioPlayer) {
            audioPlayer.muted = !audioPlayer.muted;
        }
    };

    const initialBattle = new Battle(
        monsterByName(character) as Monster,
        bossByDifficulty(difficulty)
    );

    const [battle, setBattle] = useState<Battle>(initialBattle);
    const [turn, setTurn] = useState<boolean>(false);
    const [monsterImpact, setMonsterImpact] = useState<HistoryEntry>();
    const [bossImpact, setBossImpact] = useState<HistoryEntry>();

    const [historyAttack, setHistoryAttack] = useState<BattleHistoryEntry[]>([]);



    useEffect(() => {
        if (turn) {
            const timer = setTimeout(() => {
                if (battle.status !== "ACTIVE") {
                    return;
                }
                const bossSkillInfo = battle.bossTurn();
                const skill = bossSkillInfo?.skill;
                const impact = bossSkillInfo?.history;
                setBossImpact(impact);
                const history = battle.nextTurn();
                setHistoryAttack((prev: any) => [...prev, { history, impact }]);
                setTurn(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [turn, battle]);

    const handleSkillUse = (skillIndex: number) => {
        console.log("skill", battle.monster.skills[skillIndex].name, "delay", battle.monster.skills[skillIndex].activationTurn);
        const impact = battle.useSkill(battle.monster, battle.boss, skillIndex);
        const history = battle.nextTurn();
        setMonsterImpact(impact);
        setHistoryAttack((prev: any) => [...prev, { history, impact }]);
        setTurn(true);
    };

    return (
        <>
            <div className=''>
                <button onClick={muteAndUnmute}>mute</button>
                <div className="flex  w-[80vw]">
                    <div style={{ backgroundImage: `url('${map}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
                        className={`bg-gray-200 rounded-lg w-[50vw] m-3 p-5 flex flex-col justify-between items-stretch relative`}>
                        <div className="self-end ">
                            <Pokemon name={battle.boss.name} pv={battle.boss.pv} type={[tradTpyesTOfrench(battle.boss.element)]} image={getSpiritGifByName(battle.boss.name,"Front")} maxpv={battle.boss.pvMax} impact={monsterImpact?.type == "Heal" ? bossImpact : monsterImpact} />
                        </div>
                        <div className="self-start">
                            <Pokemon name={battle.monster.name} pv={battle.monster.pv} type={[tradTpyesTOfrench(battle.monster.element)]} image={getSpiritGifByName(character,"Back")} maxpv={battle.monster.pvMax} impact={bossImpact?.type == "Heal" ? monsterImpact : bossImpact} />
                        </div>
                    </div>
                    <div className='logs '>
                        {historyAttack && <LogsAttack entries={historyAttack} />}
                    </div>
                </div>

                <p>Status: {battle.status}</p>
                <BattleControls battle={battle} handleSkillUse={handleSkillUse} endGame={endGame} />
                <audio ref={setAudioPlayer} />
            </div>
        </>
    );
};

export default Arena;
