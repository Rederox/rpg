import { Monster } from "./Monster";
import { Skill } from "./Skill";

type BattleStatus = "ACTIVE" | "MONSTER_WON" | "BOSS_WON";

export interface History{
    turn: number;
}
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

    nextTurn(): History | undefined {
        
        this.incrementTurn();
        this.updateBattleStatus();
        return {
            turn: this.turn,
        };
    }

    incrementTurn(): void {
        this.turn++;
    }

    getNextAvailableSkill(monster: Monster): Skill | null{
        // let availableSkills = monster.skills.filter(skill => 
        //     skill.isAvailable(this.turn) && // Cooldown ?
        //     (skill.activationTurn === 0 || skill.isAvailable(this.turn))
        // );
        let availableSkills = this.getCoolingDownSkills(monster);

        if (availableSkills.length > 0) {
            const randomSkill : Skill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
            return randomSkill;
        }
        return null;
    }

    getCoolingDownSkills(monster: Monster): Skill[] {
        return monster.skills.filter(skill => skill.activationTurn === 0 || skill.isAvailable(this.turn));
    }

    // monsterTurn(): any {
    //     const skill = this.getNextAvailableSkill(this.monster);
    //     if (skill) {
    //         const skillIndex = this.monster.skills.indexOf(skill);
    //         this.useSkill(this.monster, this.boss, skillIndex);
    //         return skill;
    //     } else {
    //         console.log(`${this.monster.name} has no available skills and skips a turn.`);
    //         return "NO_SKILLS_AVAILABLE";
    //     }
    // }

    bossTurn(): any {
        const skill = this.getNextAvailableSkill(this.boss);
        if (skill) {
            const skillIndex = this.boss.skills.indexOf(skill);
            const impact = this.useSkill(this.boss, this.monster, skillIndex);
            return impact;
        } else {
            console.log(`${this.boss.name} has no available skills and skips a turn.`)
            return null;
        }
    }

    useSkill(user: Monster, target: Monster, skillIndex: number) : any {
        let skill = user.skills[skillIndex];
        console.log("skill",user.name,skill.name ,skill.delay)
        if (!skill.isAvailable(this.turn)) {
            console.log(`${skill.name} is cooling down.`);
            return "COOLING_DOWN";
        }
        else {
            const impact = user.useSkill(target, skillIndex);
        // skill.resetActivation();
            skill.setActivation(this.turn);
            return impact;
        }
        
    }
    

    updateBattleStatus(): string {
        if (this.monster.pv <= 0) {
            this.status = "BOSS_WON";
            console.log("The boss has won the battle.");
            return "BOSS_WON";
        } else if (this.boss.pv <= 0) {
            this.status = "MONSTER_WON";
            console.log("The monster has won the battle.");
            return "MONSTER_WON";
        }
        return "ACTIVE";
    }
}
