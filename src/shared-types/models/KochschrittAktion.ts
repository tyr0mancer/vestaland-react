import {AktionIcon} from "../enum";
import {KochschrittAktionType} from "../schemas/kochschritt-aktion-schema";

export class KochschrittAktion implements KochschrittAktionType {
  public aktionName: string = '';
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}



