// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Expression {
  reduce(bank: Bank, to: string): Money
  plus(addend: Expression): Expression
  times(multiplier: number): Expression
}

export class Sum implements Expression {
  augend: Expression
  addend: Expression
  constructor(augend: Expression, addend: Expression) {
    this.addend = addend
    this.augend = augend
  }

  reduce(bank: Bank, to: string) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend)
  }

  times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }
}

export class Bank {
  rates: Record<string, number> = {}

  createRateKey(from: string, to: string) {
    return `${from}-${to}`
  }

  rate(from: string, to: string): number {
    if (from === to) return 1
    return this.rates[this.createRateKey(from, to)] || 0
  }

  addRate(from: string, to: string, rate: number) {
    if (rate != 0) {
      this.rates[this.createRateKey(from, to)] = rate
      this.rates[this.createRateKey(to, from)] = 1 / rate
    }
  }

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to)
  }
}

export class Money implements Expression {
  public amount = 0
  public _currency = ''

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

  equals(money: Expression) {
    return this.currency() === (money as Money).currency() && this.amount === (money as Money).amount
  }

  currency(): string {
    return this._currency
  }

  times(multiplier: number): Expression {
    return new Money(this.amount * multiplier, this._currency)
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend)
  }

  reduce(bank: Bank, to: string) {
    const rate = bank.rate(this._currency, to)
    console.log('rate', rate)
    return new Money(this.amount / rate, to)
  }
}
