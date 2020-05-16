export enum Element {
    Earth, Fire, Ice, Nature, Metal
}

export class ElementSignature {
    earth: number;
    fire: number;
    ice: number;
    nature: number;
    metal: number;

    constructor(earth: number, fire: number, ice: number, nature: number, metal: number) {
        this.earth = earth;
        this.fire = fire;
        this.ice = ice;
        this.nature = nature;
        this.metal = metal;
    }
}