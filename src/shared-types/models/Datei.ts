import {CustomOwnership} from "./_CustomOwnership";
import {DateiType} from "../schemas/datei-schema";

export class Datei extends CustomOwnership implements DateiType {
  public originalname: string = ''
  public mimetype: string = ''
  public destination: string = ''
  public filename: string = ''
  public path: string = ''
  public size: number = 0
  public beschreibung?: string;
}
