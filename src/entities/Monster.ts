import { Skill, SkillType } from "./Skill";
import Element, { ElementEffectiveness, elementEffectiveness } from "./Elements";

export interface Damage {
    damageTaken: number;
    damageDealt: number;
    damamageMultiplier: ElementEffectiveness;
}

export interface Heal {
    heal: number;
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

    useSkill(target: Monster, skillIndex: number) : Damage | Heal | undefined | string {
        let skill = this.skills[skillIndex];
        let successChance = Math.random() * 100;
        if(successChance <= skill.precision) {
            const damageDealt : number = skill.power * this.atk / 50;
            if(skill.type == SkillType.Attack){
                const damamageMultiplier : ElementEffectiveness = elementEffectiveness[this.element][target.element];
                const damageTaken : number = target.receiveDamage(damageDealt*damamageMultiplier);
                return {damageTaken: damageTaken, damageDealt: damageDealt, damamageMultiplier: damamageMultiplier};
            }
            else if(skill.type == SkillType.Heal){
                const heal = skill.power * this.pvMax / 50;
                this.pv+=(heal);
                return {heal: heal};
            }
        } else {
            console.log(`${this.name}'s attack missed.`);
            return "Missed";
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