import { photoProfile } from "../../../shared/types/photo.Types";

export class Author {
  public _id: any;
  constructor(
    public readonly fullName: string,
    public readonly biography: string,
    public readonly profession: string,
    public readonly birthdate: string | Date,
    public readonly birthplace: string,
    public readonly nationality: string,
    public readonly itActivo: boolean,
    public readonly avatar: photoProfile) { }
  public readonly writingGenre?: string[]

}

