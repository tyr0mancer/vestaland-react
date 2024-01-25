import {AktionIcon} from "../enum";
import {KochschrittAktionType} from "../schemas/kochschritt-aktion-schema";
import {TimeStamps} from "./_Timestamps";

export class KochschrittAktion extends TimeStamps implements KochschrittAktionType {
  public aktionName: string = '';
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}



