import {BenutzerRolle} from "../enum";
import {BenutzerType} from "../schemas/benutzer-schema";
import {TimeStamps} from "./_Timestamps";

export class Benutzer extends TimeStamps implements BenutzerType {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public mayLogin: boolean = false;
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}
