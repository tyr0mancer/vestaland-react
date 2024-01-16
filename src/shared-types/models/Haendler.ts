import {HaendlerType} from "../schemas/haendler-schema";
import {HaendlerGruppe} from "../enum";

export class Haendler implements HaendlerType {
  public haendlerGruppe: HaendlerGruppe = HaendlerGruppe.TIER_B;
  public haendlerName: string = ''
  public geoData: string = ''
  public abteilungOrdnung: string[] = []
}

