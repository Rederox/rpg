import React, { useState, useEffect } from 'react';
import { Battle } from './entities/Battle';
import { Damage, Heal, Monster } from './entities/Monster';
import { Skill, SkillType } from './entities/Skill';
import Element from './entities/Elements';
import { timeout } from './utils/functions';


function App() {
  
    const [battle, setBattle] = useState(new Battle(new Monster("Pikachu", 80, 50, 120, 60, [new Skill("Thunderbolt", SkillType.Attack, 0, 90, 75, Element.Electric),new Skill("Statik",SkillType.Heal,0,90,50,Element.Electric)],Element.Electric), new Monster("Boss", 80, 50, 200, 4, [new Skill("Fire Blast", SkillType.Attack, 0, 85, 50, Element.Electric)], Element.Fire)));
    const [availableSkills, setAvailableSkills] = useState(battle.monster.skills);

    const [turn, setTurn] = useState<boolean>(false);
    // useEffect(() => {
    //     setAvailableSkills(battle.monster.skills.filter(skill => skill.isAvailable(battle.turn) && (skill.activationTurn === -1 || skill.isReadyToActivate(battle.turn))));
    // }, [battle]);  

    useEffect(() => {
      if(turn){
        setTimeout(() => {
          setBossImpact(battle.bossTurn());
          setTurn(false);
          battle.nextTurn();
        }, 1000);
      }
      // setBattle(new Battle(battle.monster, battle.boss));  
    }, [turn]);

    const [monsterImpact , setMonsterImpact] = useState<Damage | Heal | undefined | string>();
    const [bossImpact , setBossImpact] = useState<Damage | Heal | undefined | string>();




    const handleSkillUse = async (skillIndex: number) => {
      setTimeout(() => {
        setMonsterImpact(battle.useSkill(battle.monster, battle.boss, skillIndex));
        setTurn(true);
        battle.nextTurn();
      }, 0);
    };


    return (
        <div>
            <h1>Battle</h1>
            <p>{battle.monster.name} HP: {battle.monster.pv}/{battle.monster.pvMax}</p>
            <p>{battle.boss.name} HP: {battle.boss.pv}/{battle.boss.pvMax}</p>
            <div> {
                monsterImpact && Object.keys(monsterImpact).map((key, index) => (
                    <p key={index}>{key}: {(monsterImpact as unknown as {[key: string]: string})[key]}</p>
                ))
              } 
            </div>

            <div> {
                bossImpact && Object.keys(bossImpact).map((key, index) => (
                    <p key={index}>{key}: {(bossImpact as unknown as {[key: string]: string})[key]}</p>
                ))
              } 
            </div>
            <p>Status: {battle.status}</p>
            <div>

                {availableSkills.length > 0 ? availableSkills.map((skill, index) => (
                    <button key={index} onClick={() => handleSkillUse(index)} disabled={battle.status !== "ACTIVE"}>
                        {skill.name}
                    </button>
                )) : <p>No skills available. Waiting...</p>}
            </div>
            <button onClick={() => battle.nextTurn()} disabled={battle.status !== "ACTIVE" || availableSkills.length > 0}>
                End Turn
            </button>

        </div>
    );
}

export default App;