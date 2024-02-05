import {Nutrients} from "../../../shared-types/models/Nutrients";

export function multiplyNutrients(nutrients: Nutrients, factor: number): Nutrients {
  nutrients.kalorien = nutrients.kalorien * factor
  nutrients.proteine = nutrients.proteine * factor
  nutrients.fett = nutrients.fett * factor
  nutrients.kohlenhydrate = nutrients.kohlenhydrate * factor
  nutrients.zucker = nutrients.zucker * factor
  nutrients.ballaststoffe = nutrients.ballaststoffe * factor

  return nutrients
}
