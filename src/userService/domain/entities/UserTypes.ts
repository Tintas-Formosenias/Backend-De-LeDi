//dates of user
export class User {
  public _id: any;
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly lastName: string,
    public readonly userName: string,
    public readonly name: string,
    public readonly birthDate: Date,
    public readonly rol: string,
    public readonly nivel: string,
    public readonly level: any,
    public readonly avatar: string,
    public readonly imgLevel: string,
    public readonly point: number,
    public readonly preference: {
      category: string[];
      format: string[];
    },
    public readonly medals: any[]
  ) { }
}


