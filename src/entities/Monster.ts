import { Skill, SkillType } from "./Skill";
import Element, { ElementEffectiveness, elementEffectiveness } from "./Elements";
import { History } from "./Battle";
export interface Damage {
    sender: string;
    target: string;
    damageTaken: number | undefined;
    damageDealt: number | undefined;
    damamageMultiplier: ElementEffectiveness;
}

export interface Heal {
    target: string;
    heal: number;
}

// Define types for entries
export type Impact = Damage | Heal | undefined;

export interface HistoryEntry {
    type: 'Damage' | 'Heal' | 'Log';
    content: Impact | string;
}

export interface BattleHistoryEntry {
    history: History;
    impact: HistoryEntry;
}
export class Monster{
    name : string;
    atk : number;
    def : number;
    pvMax : number;
    pv : number;
    speed : number;
    skills : Skill[];
    img? : string;
    defend: boolean;
    element : Element;

    constructor(name: string, atk: number, def: number, pv: number, speed: number, skills: Skill[], element: Element) {
        this.name = name;
        this.atk = atk;
        this.def = def;
        this.pvMax = pv;
        this.pv = pv;
        this.speed = speed;
        this.skills = skills;
        this.defend = false;
        this.element = element;
    }

    useSkill(target: Monster, skillIndex: number) : HistoryEntry | undefined  {
        let skill = this.skills[skillIndex];
        let successChance = Math.random() * 100;
        if(successChance <= skill.precision) {
            const damageDealt : number = skill.power * this.atk / 50;
            if(skill.type === SkillType.Attack){
                const damamageMultiplier : ElementEffectiveness = elementEffectiveness[skill.element][target.element];
                const damageTaken : number = target.receiveDamage(damageDealt*damamageMultiplier);
                console.log("dammageMultiplier", damamageMultiplier, "element", this.element , "targetElement", target.element);
                return {type: 'Damage', content: {damageTaken: damageTaken, damageDealt: damageDealt, damamageMultiplier: damamageMultiplier, sender: this.name, target: target.name}};
            }
            else if(skill.type === SkillType.Heal){
                const heal = skill.power * this.pvMax / 50;
                this.pv+=(heal);
                return {type: 'Heal', content: {heal: heal, target: this.name}};
            }
        } else {
            return {type: 'Log', content: `l'attaque de ${this.name} a échoué`};
        }
    }

    receiveDamage(damage: number) : number {
        let defendDef = this.def;
        if(this.defend) {
            defendDef*=2;
        }
        const actualDamage = Math.max(0, damage - this.def);
        this.pv -= actualDamage;
        return actualDamage;
    }

}