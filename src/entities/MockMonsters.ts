import { Skill, SkillType } from './Skill';
import { Monster } from './Monster';
import ElementType from './Elements';


class MockMonster {
    mockSkills: Skill[] = [
        new Skill("Thunder Shock", SkillType.Attack, 0, 90, 30, ElementType.Electric),
        new Skill("Quick Heal", SkillType.Heal, 2, 100, 20, ElementType.Normal),
        new Skill("Fire Blast", SkillType.Attack, 0, 80, 50, ElementType.Fire),
        new Skill("Paralyzing Shock", SkillType.Attack, 1, 75, 25, ElementType.Electric)
    ];
    mockMonsters: Monster[] = [
        new Monster("Pikachu", 45, 35, 120, 90, [this.mockSkills[0], this.mockSkills[1]], ElementType.Electric),
        new Monster("Charizard", 60, 55, 150, 80, [this.mockSkills[2]], ElementType.Fire),
        new Monster("Electabuzz", 50, 45, 110, 105, [this.mockSkills[0], this.mockSkills[3]], ElementType.Electric)
    ];
    

}   

export { MockMonster };