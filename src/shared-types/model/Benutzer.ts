import {BenutzerRolle} from "../enum";
import { TimeStamps } from "../model-helper";
import {BenutzerType} from "./benutzer-schema";

export class Benutzer extends TimeStamps implements BenutzerType {
  public mayLogin: boolean = false;
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}
