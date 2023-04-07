class Money {
  protected amount = 0
  equals(money: Money) {
    console.log(Object.getPrototypeOf(money))
    console.log(Object.getPrototypeOf(this))
    return Object.getPrototypeOf(money) === Object.getPrototypeOf(this) && this.amount === money.amount
  }
}
export class Dollar extends Money {
  constructor(amount: number) {
    super()
    this.amount = amount
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier)
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super()
    this.amount = amount
  }

  times(multiplier: number) {
    return new Franc(this.amount * multiplier)
  }
}
