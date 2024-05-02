import { Monster } from "./Monster";
import { Skill } from "./Skill";

type BattleStatus = "ACTIVE" | "MONSTER_WON" | "BOSS_WON";

export class Battle {
    monster: Monster;
    boss: Monster;
    turn: number;
    status: BattleStatus;

    constructor(monster: Monster, boss: Monster) {
        this.monster = monster;
        this.boss = boss;
        this.turn = 0;
        this.status = "ACTIVE";
    }

    nextTurn(): void {
        // if (this.turn % 2 === 1) {
        //     this.bossTurn();
        // }
        this.incrementTurn();
        this.updateBattleStatus();
        console.log(`Turn ${this.turn}`);
    }

    incrementTurn(): void {
        this.turn++;
    }

    getNextAvailableSkill(monster: Monster): Skill | null {
        // let availableSkills = monster.skills.filter(skill => 
        //     skill.isAvailable(this.turn) && // Cooldown ?
        //     (skill.activationTurn === 0 || skill.isAvailable(this.turn))
        // );
        let availableSkills = this.getCoolingDownSkills(monster);

        if (availableSkills.length > 0) {
            const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
            return randomSkill;
        }
        return null;
    }

    getCoolingDownSkills(monster: Monster): Skill[] {
        return monster.skills.filter(skill => skill.activationTurn === 0 || skill.isAvailable(this.turn));
    }

    monsterTurn(): void {
        const skill = this.getNextAvailableSkill(this.monster);
        if (skill) {
            const skillIndex = this.monster.skills.indexOf(skill);
            this.useSkill(this.monster, this.boss, skillIndex);
        } else {
            console.log(`${this.monster.name} has no available skills and skips a turn.`);
        }
    }

    bossTurn(): any {
        const skill = this.getNextAvailableSkill(this.boss);
        if (skill) {
            const skillIndex = this.boss.skills.indexOf(skill);
            const impact = this.useSkill(this.boss, this.monster, skillIndex);
            return impact;
        } else {
            console.log(`${this.boss.name} has no available skills and skips a turn.`);
        }
    }

    useSkill(user: Monster, target: Monster, skillIndex: number) : any {
        let skill = user.skills[skillIndex];
        if (!skill.isAvailable(this.turn)) {
            console.log(`${skill.name} is cooling down.`);
            return null;
        }
        if (skill.delay > 0 && skill.activationTurn === -1) {
            skill.setActivation(this.turn);
            console.log(`${skill.name} will activate in ${skill.delay} turns.`);
            return null;
        }
        const impact = user.useSkill(target, skillIndex);
        skill.resetActivation();
        return impact;
    }
    

    updateBattleStatus(): void {
        if (this.monster.pv <= 0) {
            this.status = "BOSS_WON";
            console.log("The boss has won the battle.");
        } else if (this.boss.pv <= 0) {
            this.status = "MONSTER_WON";
            console.log("The monster has won the battle.");
        }
    }
}
