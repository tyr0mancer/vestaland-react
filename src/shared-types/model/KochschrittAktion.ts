import {AktionIcon} from "../enum";
import {KochschrittAktionType} from "./kochschritt-aktion.schema";

export class KochschrittAktion implements KochschrittAktionType {
  public aktionName: string = '';
  public aktionIcon: AktionIcon = AktionIcon.DUMMY;
}
