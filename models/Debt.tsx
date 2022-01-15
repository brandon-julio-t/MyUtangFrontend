export default class Debt {
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',
    public debtorId: string = '',
    public lenderId: string = '',
    public amount: number = 0,
    public paid: boolean = false
  ) {}
}
