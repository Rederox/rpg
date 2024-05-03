import React from 'react';
import { BattleHistoryEntry, Damage, Heal } from '../../../entities/Monster'; // Adjust this import according to your file structure

const LogsAttack: React.FC<{ entries: BattleHistoryEntry[] }> = ({ entries }) => {
    const renderImpact = (entry: BattleHistoryEntry) => {
        const { turn } = entry.history;
        const { type, content } = entry.impact;
    
        switch (type) {
            case 'Damage':
                const { damageTaken, damageDealt, sender: attaquant, target: cible } = content as Damage;
                return (
                    <p key={turn}>
                        Tour {turn} : {attaquant} attaque {cible} - Dégâts infligés : {damageDealt ?? 'Aucun'}, Dégâts subis : {damageTaken ?? 'Aucun'}
                    </p>
                );
            case 'Heal':
                const { heal,target } = content as Heal;
                return (
                    <p key={turn}>
                        Tour {turn} : {target} s'est soigné - Quantité : {heal}
                    </p>
                );
            case 'Log':
                return <p key={turn}>Tour {turn} : {String(content)}</p>;
            default:
                return <p key={turn}>Tour {turn} : Type d'entrée inconnu</p>;
        }
    };
    
    return (
        <div className="history-attacks overflow-auto bg-gray-100 p-4 pt-0 m-3 rounded-lg w-[30vw] h-[70vh]">
            <h1 className='custom-font fixed bg-gray-100 w-[29vw] py-3'>Les historique de combat</h1>
            {entries.map(renderImpact)}
        </div>
    );
    
};

export default LogsAttack;
