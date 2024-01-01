import {BenutzerRolle} from "../services/auth/types";
import {MongoDocumentFields} from "./types";

export class Benutzer extends MongoDocumentFields {
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public rollen: BenutzerRolle[] = [];
  public resetPasswordHash?: string;
  public resetPasswordExpires?: Date;
}

