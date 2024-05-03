import React, { useState, useEffect } from 'react';
import './Arena.scss';
import { Battle } from '../../entities/Battle';
import { HistoryEntry, Monster, BattleHistoryEntry } from '../../entities/Monster';
import { Skill, SkillType } from '../../entities/Skill';
import Pokemon from './pokemon/pokemon';
import LogsAttack from './logs/logsAttack';
import Element from '../../entities/Elements';
import { tradTpyesTOfrench } from '../../utils/functions';
import BattleControls from './BattleControls';

const Arena: React.FC = () => {
    const initialBattle = new Battle(
        new Monster("Pikachu", 50, 40, 160, 60, [
            new Skill("Thunderbolt ", SkillType.Attack, 0, 75, 80,Element.Electric),
            new Skill("Quick Attack ", SkillType.Attack, 0, 100, 60,Element.Normal),
            new Skill("Statik ", SkillType.Heal, 2, 90, 70,Element.Electric)
        ], 
        Element.Electric
        ),
        new Monster("Boss", 80, 60, 200, 4, [
            new Skill("Fire Blast ", SkillType.Attack, 0, 85, 60,Element.Fire),
            new Skill("Flamethrower ", SkillType.Attack, 2, 75, 70,Element.Fire),
            new Skill("Heal ", SkillType.Heal, 5, 100, 50,Element.Normal),
        ], Element.Water)
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
                setHistoryAttack((prev: any) => [...prev, {history, impact}]);
                setTurn(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [turn, battle]);
    
    const handleSkillUse = (skillIndex: number) => {
        console.log("skill", battle.monster.skills[skillIndex].name,"delay", battle.monster.skills[skillIndex].activationTurn);
        const impact = battle.useSkill(battle.monster,battle.boss, skillIndex);
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
                        <Pokemon name={battle.boss.name} pv={battle.boss.pv} type={[tradTpyesTOfrench(battle.boss.element)]} image="pokemon/pikachu.gif" maxpv={battle.boss.pvMax} impact={monsterImpact?.type == "Heal" ? bossImpact : monsterImpact}/>
                    </div>
                    <div className="self-start">
                        <Pokemon name={battle.monster.name} pv={battle.monster.pv} type={[tradTpyesTOfrench(battle.monster.element)]} image="pokemon/pickachuBack.gif" maxpv={battle.monster.pvMax} impact={bossImpact?.type == "Heal" ? monsterImpact: bossImpact}/> 
                    </div>
                </div>
                <div className='logs '>
                {historyAttack && <LogsAttack entries={historyAttack} />}
                </div>
            </div>

            <p>Status: {battle.status}</p>
            <BattleControls battle={battle} handleSkillUse={handleSkillUse} />
        </>
    );
};

export default Arena;
