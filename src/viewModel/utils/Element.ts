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

    add(other: ElementSignature) : ElementSignature {
        return new ElementSignature(this.earth + other.earth, this.fire + other.fire, this.ice + other.ice, this.nature + other.nature, this.metal + other.metal);
    }

    sub(other: ElementSignature) : ElementSignature {
        return new ElementSignature(this.earth - other.earth, this.fire - other.fire, this.ice - other.ice, this.nature - other.nature, this.metal - other.metal);
    }

    magnitude() : number {
        return Math.max(this.earth, 0) + Math.max(this.fire, 0) + Math.max(this.ice, 0) + Math.max(this.nature, 0) + Math.max(this.metal, 0)
    }

}