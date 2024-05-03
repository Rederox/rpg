export function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

export function tradTpyesTOfrench(type : string) {
    switch (type) {
        case "Fire" : 
            return "feu"
            break;
        case "Water" :
            return "eau"
            break;
        case "Grass" :
            return "plante"
            break;
        case "Electric" :
            return "électrik"
            break;
        case "Psychic" :
            return "psy"
            break;
        default:
            return type
            break;
    }
}