import {TimeStamps} from "./types";
import {BenutzerRolle} from "../enum";

export class Benutzer extends TimeStamps {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}

