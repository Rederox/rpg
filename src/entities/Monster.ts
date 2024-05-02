import { Skill, SkillType } from "./Skill";

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

    useSkill(target: Monster, skillIndex: number) {
        let skill = this.skills[skillIndex];
        let successChance = Math.random() * 100;
        if(successChance <= skill.precision) {
            if(skill.type == SkillType.Attack){
                target.receiveDamage(skill.power * this.atk);
            }
            else if(skill.type == SkillType.Heal){
                this.pv+=(skill.power*this.pvMax);
            }
        } else {
            console.log(`${this.name}'s attack missed.`);
        }
    }

    receiveDamage(damage: number) {
        let defendDef = this.def;
        if(this.defend) {
            defendDef*=2;
        }
        const actualDamage = Math.max(0, damage - this.def);
        this.pv -= actualDamage;
    }

}