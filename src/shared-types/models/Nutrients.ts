import {NutrientsType} from "../schemas/nutrients-schema";

export class Nutrients implements NutrientsType {
  public kalorien: number = 0;
  public fett: number = 0;
  public proteine: number = 0;
  public kohlenhydrate: number = 0;
  public zucker: number = 0;
  public ballaststoffe: number = 0;
}
