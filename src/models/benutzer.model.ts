import {BenutzerRolle} from "../services/auth/types";

export class Benutzer {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}

