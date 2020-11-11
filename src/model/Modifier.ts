import { ModifiedStats } from "./modifiers";

export class Modifier {
    apply(modifiedStats: ModifiedStats) {
        throw new Error("Method not implemented.");
    }
    deepClone(): any {
        throw new Error("Method not implemented.");
    }

}