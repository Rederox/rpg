import { Skill, SkillType } from './Skill';
import { Monster } from './Monster';


class MockMonster {
    skills : Skill[] = [
        new Skill("Fireball",SkillType.Attack,2,80,50),
        new Skill("Heal", SkillType.Heal, 1, 100, 20),
        new Skill("Thunderbolt", SkillType.Attack, 3, 70, 70)
    ]
    monsters : Monster[] = [
        new Monster("Machin",30,40,200,30,this.skills),
        new Monster("Goblin", 20, 25, 150, 15, this.skills),
        new Monster("Orc", 35, 50, 250, 40, this.skills),
        new Monster("Dragon", 100, 150, 500, 100, this.skills)
    ]    
    

}   

export { MockMonster };