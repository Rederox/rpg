import React, { useState, useEffect } from 'react';
import './Arena.scss';
import { Battle } from '../../entities/Battle';
import { HistoryEntry, Monster, BattleHistoryEntry } from '../../entities/Monster';
import { Skill, SkillType } from '../../entities/Skill';
import Pokemon from './pokemon/pokemon';
import LogsAttack from './logs/logsAttack';


const Arena: React.FC = () => {
    const initialBattle = new Battle(
        new Monster("Pikachu", 80, 50, 120, 60, [
            new Skill("Thunderbolt", SkillType.Attack, 0, 90, 75),
            new Skill("Statik", SkillType.Heal, 0, 90, 50)
        ]),
        new Monster("Boss", 80, 50, 200, 4, [
            new Skill("Fire Blast", SkillType.Attack, 0, 85, 50)
        ])
    );

    const [battle, setBattle] = useState<Battle>(initialBattle);
    const [turn, setTurn] = useState<boolean>(false);
    const [monsterImpact, setMonsterImpact] = useState<HistoryEntry>();
    const [bossImpact, setBossImpact] = useState<HistoryEntry>();

    const [historyAttack, setHistoryAttack] = useState<BattleHistoryEntry[]>([]);


    useEffect(() => {
        if (turn) {
            const timer = setTimeout(() => {
                const impact = battle.bossTurn();
                setBossImpact(impact);
                const history = battle.nextTurn();
                setHistoryAttack((prev: any) => [...prev, {history, impact}]);
                setTurn(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [turn, battle]);
    
    const handleSkillUse = (skillIndex: number) => {
        const impact = battle.monster.useSkill(battle.boss, skillIndex);
        const history = battle.nextTurn();
        setMonsterImpact(impact);
        setHistoryAttack((prev: any) => [...prev, {history, impact}]);
        setTurn(true);
    };
    

    console.log(historyAttack);

    return (
        <>
            <div className="flex">
                <div className="bg-gray-200 p-5 m-3 rounded-lg w-[70%] flex flex-col justify-between items-stretch">
                    <div className="self-end">
                        <Pokemon name={battle.monster.name} pv={battle.monster.pv} type={["Electrik", "Ténèbres"]} image="pokemon/pikachu.gif" maxpv={battle.monster.pvMax} />
                    </div>
                    <div className="self-start">
                        <Pokemon name={battle.boss.name} pv={battle.boss.pv} type={["Feu"]} image="pokemon/pickachuBack.gif" maxpv={battle.boss.pvMax} />
                    </div>
                </div>
                <div className='logs '>
                {historyAttack && <LogsAttack entries={historyAttack} />}


                </div>
            </div>

            <p>Status: {battle.status}</p>
            <div className="impacts">
                {monsterImpact && <p>Monster's last impact: {JSON.stringify(monsterImpact)}</p>}
                {bossImpact && <p>Boss's last impact: {JSON.stringify(bossImpact)}</p>}
            </div>
            <div className="controls">
                {battle.monster.skills.map((skill, index) => (
                    <button key={index} onClick={() => handleSkillUse(index)} disabled={battle.status !== "ACTIVE"}>
                        {skill.name}
                    </button>
                ))}
                <button onClick={() => battle.nextTurn()} disabled={battle.status !== "ACTIVE"}>
                    End Turn
                </button>
            </div>
        </>
    );
};

export default Arena;
