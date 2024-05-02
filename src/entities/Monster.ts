import { Skill, SkillType } from "./Skill";

export interface Damage {
    damageTaken: number | undefined;
    damageDealt: number | undefined;
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

    constructor(name: string, atk: number, def: number, pv: number, speed: number, skills: Skill[]) {
        this.name = name;
        this.atk = atk;
        this.def = def;
        this.pvMax = pv;
        this.pv = pv;
        this.speed = speed;
        this.skills = skills;
        this.defend = false;
    }

    useSkill(target: Monster, skillIndex: number) : Damage | Heal | undefined | string {
        let skill = this.skills[skillIndex];
        let successChance = Math.random() * 100;
        if(successChance <= skill.precision) {
            const damageDealt : number = skill.power * this.atk / 50;
            if(skill.type == SkillType.Attack){
                const damageTaken = target.receiveDamage(damageDealt);
                return {damageTaken: damageTaken, damageDealt: damageDealt};
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

    receiveDamage(damage: number) : number | undefined {
        let defendDef = this.def;
        if(this.defend) {
            defendDef*=2;
        }
        const actualDamage = Math.max(0, damage - this.def);
        this.pv -= actualDamage;
        return actualDamage;
    }

}