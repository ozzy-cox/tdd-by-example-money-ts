export class Money {
  protected amount = 0
  protected _currency = ''

  constructor(amount: number, currency: string) {
    this.amount = amount
    this._currency = currency
  }

  static dollar(amount: number): Money {
    return new Money(amount, 'USD')
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF')
  }

  equals(money: Money) {
    return this.currency() === money.currency() && this.amount === money.amount
  }

  currency(): string {
    return this._currency
  }

  times(multiplier: number) {
    return new Money(this.amount * multiplier, this._currency)
  }

  plus(addend: Money) {
    return new Money(addend.amount + this.amount, this.currency())
  }
}
