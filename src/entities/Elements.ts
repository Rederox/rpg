enum Element {
    Normal = "Normal",
    Fire = "Fire",
    Water = "Water",
    Electric = "Electric",
    Grass = "Grass",
    Psychic = "Psychic"
}
export default Element;

export enum ElementEffectiveness {
    NotVeryEffective = 0.5,
    Normal = 1,
    SuperEffective = 2,
}

export const elementEffectiveness: Record<Element, Record<Element, ElementEffectiveness>> = {
    [Element.Normal]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.Normal,
        [Element.Water]: ElementEffectiveness.Normal,
        [Element.Electric]: ElementEffectiveness.Normal,
        [Element.Grass]: ElementEffectiveness.Normal,
        [Element.Psychic]: ElementEffectiveness.Normal,
    },
    [Element.Fire]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.NotVeryEffective,
        [Element.Water]: ElementEffectiveness.NotVeryEffective,
        [Element.Electric]: ElementEffectiveness.Normal,
        [Element.Grass]: ElementEffectiveness.SuperEffective,
        [Element.Psychic]: ElementEffectiveness.Normal,
    },
    [Element.Water]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.SuperEffective,
        [Element.Water]: ElementEffectiveness.NotVeryEffective,
        [Element.Electric]: ElementEffectiveness.Normal,
        [Element.Grass]: ElementEffectiveness.NotVeryEffective,
        [Element.Psychic]: ElementEffectiveness.Normal,
    },
    [Element.Electric]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.Normal,
        [Element.Water]: ElementEffectiveness.SuperEffective,
        [Element.Electric]: ElementEffectiveness.NotVeryEffective,
        [Element.Grass]: ElementEffectiveness.NotVeryEffective,
        [Element.Psychic]: ElementEffectiveness.Normal,
    },
    [Element.Grass]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.NotVeryEffective,
        [Element.Water]: ElementEffectiveness.SuperEffective,
        [Element.Electric]: ElementEffectiveness.Normal,
        [Element.Grass]: ElementEffectiveness.NotVeryEffective,
        [Element.Psychic]: ElementEffectiveness.Normal,
    },
    [Element.Psychic]: {
        [Element.Normal]: ElementEffectiveness.Normal,
        [Element.Fire]: ElementEffectiveness.Normal,
        [Element.Water]: ElementEffectiveness.Normal,
        [Element.Electric]: ElementEffectiveness.Normal,
        [Element.Grass]: ElementEffectiveness.Normal,
        [Element.Psychic]: ElementEffectiveness.NotVeryEffective,
    }
};