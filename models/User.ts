export default class User {
  constructor(
    public id: string = '',
    public discordId: string | null = null,
    public userName: string = '',
    public password: string = ''
  ) {}

  public clone(): this {
    return Object.create(this);
  }
}
