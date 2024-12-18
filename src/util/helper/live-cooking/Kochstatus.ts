import {Rezept} from "../../../shared-types/models/Rezept";

export class Kochstatus {
    rezept: Rezept;
    timer: string[] = [];

    constructor(rezept: Rezept) {
        this.rezept = rezept;
        this.timer = []
    }

    isActive(): boolean {
        return this.rezept !== undefined
    }



}
