import { Skill, SkillType } from './Skill';
import { Monster } from './Monster';


class MockMonster {
    mockSkills: Skill[] = [
        new Skill("Thunder Shock", SkillType.Attack, 0, 90, 30),
        new Skill("Quick Heal", SkillType.Heal, 2, 100, 20),
        new Skill("Fire Blast", SkillType.Attack, 0, 80, 50),
        new Skill("Paralyzing Shock", SkillType.Attack, 1, 75, 25)
    ];
    mockMonsters: Monster[] = [
        new Monster("Pikachu", 45, 35, 120, 90, [this.mockSkills[0], this.mockSkills[1]]),
        new Monster("Charizard", 60, 55, 150, 80, [this.mockSkills[2]]),
        new Monster("Electabuzz", 50, 45, 110, 105, [this.mockSkills[0], this.mockSkills[3]])
    ];
    

}   

export { MockMonster };