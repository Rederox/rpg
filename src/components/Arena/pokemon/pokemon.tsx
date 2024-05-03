import React from 'react';
import HealthBar from './healthBar';

interface PokemonProps {
    name: string;
    pv: number;
    maxpv: number;
    type: string[];
    image: string;
}

const Pokemon: React.FC<PokemonProps> = ({ name, pv, maxpv, type, image }) => {

    function formatLowerCaseAndWithoutFrenchAccent(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    return (
        <div className='w-full flex justify-center flex-col items-center gap-4'>
            <div className='w-[250px] bg-slate-900 p-2 pr-3 rounded-md space-y-2'>
                <div className='flex justify-between items-center gap-2'>
                    <a className='text-lg font-bold text-center custom-font text-white tracking-wider'>{name}</a>
                    <div className="flex justify-center gap-1">
                        {type.map((type, index) => (
                            <img key={index} className="h-6" src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/${formatLowerCaseAndWithoutFrenchAccent(type)}.png`} alt={type} />
                        ))}
                    </div>
                </div>
                <HealthBar currentHp={pv} maxHp={maxpv} />
            </div>
            <img className="h-32" src={image} alt={name} />
        </div>
    );
};

export default Pokemon;
