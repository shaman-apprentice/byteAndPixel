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

    equals(other : ElementSignature) : boolean {
        return this.earth == other.earth && this.fire == other.fire && this.ice == other.ice && this.nature == other.nature && this.metal == other.metal;
    }

    getElement() : Element {
        //TODO: this will not work very well once we have multi-element monsters and tiles
        if (this.earth > 0) return Element.Earth;
        if (this.fire > 0) return Element.Fire;
        if (this.ice > 0) return Element.Ice;
        if (this.nature > 0) return Element.Nature;
        if (this.metal > 0) return Element.Metal;
        return undefined;
    }

    static build(element: Element, value: number = 1) {
        switch(element) {
            case Element.Earth: return new ElementSignature(value,0,0,0,0);
            case Element.Fire: return new ElementSignature(0,value,0,0,0);
            case Element.Ice: return new ElementSignature(0,0,value,0,0);
            case Element.Nature: return new ElementSignature(0,0,0,value,0);
            case Element.Metal: return new ElementSignature(0,0,0,0,value);
        }
    }

    static buildNeutral() : ElementSignature {
        return new ElementSignature(0,0,0,0,0);
    }

}