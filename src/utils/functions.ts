import { Skill, SkillType } from "../entities/Skill";
import { Monster } from "../entities/Monster";
import Element from '../entities/Elements';

export function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export function tradTpyesTOfrench(type : string) {
    switch (type) {
        case "Fire" : 
            return "feu"
            break;
        case "Water" :
            return "eau"
            break;
        case "Grass" :
            return "plante"
            break;
        case "Electric" :
            return "électrik"
            break;
        case "Psychic" :
            return "psy"
            break;
        default:
            return type
            break;
    }
}

// const createMonster = (data: any): Monster => {
//     const skills = data.skills.map((skill: any) => new Skill(
//         skill.name,
//         skill.type,
//         skill.delay,
//         skill.precision,
//         skill.power,
//         skill.element
//     ));
//     return new Monster(
//         data.name,
//         data.atk,
//         data.def,
//         data.hp,
//         data.speed,
//         skills,
//         data.element
//     );
// };
const createMonster = (data: any): Monster => {
    const skills = data.skills.map((skill: any) => {
        console.log("Processing skill:", skill);
        return new Skill(
            skill.name,
            toSkillType(skill.type),
            skill.delay,
            skill.precision,
            skill.power,
            toElement(skill.element)
        );
    });
    return new Monster(
        data.name,
        data.atk,
        data.def,
        data.hp,
        data.speed,
        skills,
        toElement(data.element)
    );
};

export const bossByDifficulty = (difficulty: string): Monster => {
    if (difficulty === "facile") {
        return monsterByName("Mewtwo") as Monster;
    } else if (difficulty === "moyen") {
        return monsterByName("Rayquaza") as Monster;
    } else if (difficulty === "difficile") {
        return monsterByName("Arceus") as Monster;
    } else {
        throw new Error(`Unknown difficulty level: ${difficulty}`);
    }
};

export const monsterByName = (name: string): Monster | undefined => {
    const monsterData = monstersData.find(monster => monster.name === name);
    if (!monsterData) {
        console.error("Monster not found: " + name);
        return undefined;
    }
    return createMonster(monsterData);
};

export const getSpiritGifByName = (name: string, side : string): string => {
        return `sprite/${name}${side}.gif`;
    
};
const toSkillType = (type: string): SkillType => {
    switch (type) {
        case "ATTACK": return SkillType.Attack;
        case "HEAL": return SkillType.Heal;
        default: return SkillType.Attack; // Default or throw an error if needed
    }
};

const toElement = (element: string | undefined): Element => {
    if (!element) {
        console.warn("Element is undefined, defaulting to Normal");
        return Element.Normal;  // Default value if element is undefined
    }
    switch (element.toUpperCase()) {
        case "ELECTRIC": return Element.Electric;
        case "WATER": return Element.Water;
        case "GRASS": return Element.Grass;
        case "FIRE": return Element.Fire;
        case "NORMAL": return Element.Normal;
        case "PSYCHIC": return Element.Psychic;
        default: 
            console.warn(`Unknown element: ${element}`);
            return Element.Normal;  // Default or handle as needed
    }
};




const monstersData  = [
    {
        "name" : "Pikachu",
        "atk" : 55,
        "def" : 40,
        "hp" : 200,
        "speed" : 50,
        "skills" : [
            {
                "name" : "Fatal Foudre",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 80,
                "power" : 120,
                "element" : "Electric"
            },
            {
                "name" : "Tonnerre",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 100,
                "power" : 80,
                "element" : "Electric"
            },
            {
                "name" : "Vive Attaque",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 100,
                "power" : 60,
                "element" : "Normal"
            },
            {
                "name" : "Recharge",
                "type" : "HEAL",
                "delay" : 2,
                "precision" : 90,
                "power" : 40,
                "element" : "Electric"
            }
        ],
        "element" : "Electric"      
    },
    {
        "name" : "Pingoleon",
        "atk" : 70,
        "def" : 50,
        "hp" : 220,
        "speed" : 65,
        "skills" : [
            {
                "name" : "Aqua Jet",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 100,
                "power" : 70,
                "element" : "Water"
            },
            {
                "name" : "Jet d'eau",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 80,
                "power" : 90,
                "element" : "Water"
            },
            {
                "name" : "Griffe",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 90,
                "power" : 50,
                "element" : "Water"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 2,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ],
        "element" : "Water"      
    },
    {
        "name" : "Blindepique",
        "atk" : 65,
        "def" : 65,
        "hp" : 230,
        "speed" : 43,
        "skills" : [
            {
                "name" : "Fouet Lianes",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 80,
                "power" : 90,
                "element" : "Grass"
            },
            {
                "name" : "Tempête Verte",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 70,
                "power" : 120,
                "element" : "Grass"
            },
            {
                "name" : "Charge",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 100,
                "power" : 40,
                "element" : "Normal"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 2,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ],
        "element" : "Grass"
    },
    {
        "name" : "Lugulabre",
        "atk" : 70,
        "def" : 45,
        "hp" : 190,
        "speed" : 60,
        "skills" : [
            {
                "name" : "Deflagration",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 70,
                "power" : 120,
                "element" : "Fire"

            },
            {
                "name" : "Lance-Flamme",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 90,
                "power" : 80,
                "element" : "Fire"
            },
            {
                "name" : "Flammeche",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 100,
                "power" : 40,
                "element" : "Fire"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 2,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ]
    },
    {
        "name" : "Mewtwo",
        "atk" : 90,
        "def" : 50,
        "hp" : 250,
        "speed" : 100,
        "skills" : [
            {
                "name" : "Psyko",
                "type" : "ATTACK",
                "delay" : 6,
                "precision" : 80,
                "power" : 90,
                "element" : "Psy"
            },
            {
                "name" : "Aura Sphère",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 100,
                "power" : 80,
                "element" : "Psy"
            },
            {
                "name" : "Choc Psy",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 80,
                "power" : 50,
                "element" : "Psy"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 4,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ],
        "element" : "Psy"
    },
    {
        "name" : "Rayquaza",
        "atk" : 90,
        "def" : 60,
        "hp" : 250,
        "speed" : 90,
        "skills" : [
            {
                "name" : "Draco-souffle",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 70,
                "power" : 120,
                "element" : "Fire"
            },
            {
                "name" : "Lance-Flamme",
                "type" : "ATTACK",
                "delay" : 2,
                "precision" : 90,
                "power" : 80,
                "element" : "Fire"
            },
            {
                "name" : "Tonnerre",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 80,
                "power" : 60,
                "element" : "Electric"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 2,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ],
        "element" : "Normal"
    },
    {
        "name" : "Arceus",
        "atk" : 90,
        "def" : 70,
        "hp" : 300,
        "speed" : 100,
        "skills" : [
            {
                "name" : "Jugement",
                "type" : "ATTACK",
                "delay" : 6,
                "precision" : 80,
                "power" : 120,
                "element" : "Normal"
            },
            {
                "name" : "Lance-Flamme",
                "type" : "ATTACK",
                "delay" : 4,
                "precision" : 90,
                "power" : 80,
                "element" : "Fire"
            },
            {
                "name" : "Tonnerre",
                "type" : "ATTACK",
                "delay" : 0,
                "precision" : 80,
                "power" : 60,
                "element" : "Electric"
            },
            {
                "name" : "Soin",
                "type" : "HEAL",
                "delay" : 4,
                "precision" : 90,
                "power" : 50,
                "element" : "Normal"
            }
        ]
    }
]