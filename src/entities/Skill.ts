export enum SkillType {
    Attack = "ATTACK",
    Heal = "HEAL"
}

export class Skill {
    name: string;
    type: SkillType;
    delayMax: number;
    delay: number;
    precision: number;
    power: number;

    constructor(name: string, type: SkillType, delay: number, precision: number, power: number) {
        if (precision < 10 || precision > 100) {
            throw new Error('Precision must be between 10 and 100');
        }
        this.name = name;
        this.type = type;
        this.delay = delay;
        this.delayMax = delay;
        this.precision = precision;
        this.power = power;
    }
}