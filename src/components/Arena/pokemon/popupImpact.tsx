import React, { useState, useEffect } from 'react';
import { HistoryEntry } from '../../../entities/Monster';

interface PopUpImpactProps {
    impact: any; 
}

const PopUpImpact: React.FC<PopUpImpactProps> = ({ impact }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [impact]);

    if (!show) {
        return null;
    }

    let content;
    switch (impact.type) {
        case "Heal":
            content = (
                <div className="bg-green-300 p-2 rounded shadow">
                    <p>+{impact.content.heal}</p>
                </div>
            );
            break;
        case "Damage":
            content = (
                <div className="bg-red-300 p-2 rounded shadow">
                    <p>-{impact.content.damageTaken}</p>
                </div>
            );
            break;
        default:
            content = <p className='bg-blue-900 p-2 text-white'>{impact.content}</p>;  
    }

    return (
        <div className="absolute bottom-0 right-0 w-[200px] rounded z-50">
            {content}
        </div>
    );
}

export default PopUpImpact;
