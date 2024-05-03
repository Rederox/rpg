import { Skill } from '@/entities/Skill';
import React from 'react';

const BattleControls = ({ battle, handleSkillUse }: any) => {

    return (
        <div className="controls p-4 bg-gray-800 text-white m-2 rounded-md flex">
            {battle.monster.skills.map((skill : Skill, index:number) => (
                <button
                    key={index}
                    onClick={() => handleSkillUse(index)}
                    disabled={battle.status !== "ACTIVE" || !skill.isAvailable(battle.turn)}
                    className="relative text-left p-2 m-2 w-[150px] bg-gray-700 rounded hover:bg-gray-600 transition-colors disabled:bg-gray-500 flex items-center justify-between"
                >
                    <span>{skill.name}</span>
                    {!skill.isAvailable(battle.turn) && (
                        <span className="absolute top-0 right-0 w-full h-full flex justify-center items-center bg-red-500 rounded opacity-75 transition-opacity">
                            <span className="text-xs leading-none p-1 text-white">{skill.activationTurn - battle.turn} tour restant</span>
                        </span>
                    )}
                </button>
            ))}
            <button
                onClick={() => battle.nextTurn()}
                disabled={battle.status !== "ACTIVE"}
                className="p-2 m-2 bg-blue-500 rounded hover:bg-blue-400 transition-colors disabled:bg-gray-500"
            >
                End Turn
            </button>
        </div>
    );
};

export default BattleControls;
