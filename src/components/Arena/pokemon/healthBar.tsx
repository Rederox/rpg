import React from 'react';

interface HealthBarProps {
    currentHp: number;
    maxHp: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ currentHp, maxHp }) => {
    const hpPercentage = Math.min((currentHp / maxHp) * 100, 100);
    const overflowPercentage = currentHp > maxHp ? ((currentHp - maxHp) / maxHp) * 100 : 0;

    let bgColorClass = '';

    if (hpPercentage >= 75) {
        bgColorClass = 'bg-green-500';
    } else if (hpPercentage >= 40) {
        bgColorClass = 'bg-orange-500'; 
    } else {
        bgColorClass = 'bg-red-500';
    }

    return (
        <div>
            <div className="w-full bg-gray-200 rounded-lg h-6 flex items-center overflow-hidden">
                <div className={`${bgColorClass} h-6 rounded-lg flex items-center justify-end transition-all delay-250`} style={{ width: `${Math.min(hpPercentage, 100)}%` }}>
                    <span className={`text-white text-sm font-medium pr-2 ${hpPercentage < 30 && "hidden"}`}>{`${currentHp} / ${maxHp}`}</span>
                </div>
                {hpPercentage < 30 && <span className="text-gray-700 text-sm font-medium pl-2">{`${currentHp} / ${maxHp}`}</span>}
            </div>
            {overflowPercentage > 0 && (
                <div className="w-full bg-gray-300 rounded-lg h-1 mt-1 overflow-hidden">
                    <div className="bg-gray-400 h-1 rounded-lg transition-all delay-250" style={{ width: `${overflowPercentage}%` }}></div>
                </div>
            )}
        </div>
    );
};

export default HealthBar;
