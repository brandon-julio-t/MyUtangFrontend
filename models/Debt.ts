import User from './User';

export default class Debt {
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',
    public debtor: User | null = null,
    public lender: User | null = null,
    public amount: number = 0,
    public paid: boolean = false
  ) {}
}
