import {BenutzerRolle} from "../services/auth/types";
import {TimeStamps} from "./types";

export class Benutzer extends TimeStamps {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}

