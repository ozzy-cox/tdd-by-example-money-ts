import { Expression, Bank, Money, Sum } from '../src'

describe('operations', () => {
  test('dollar multiplication', () => {
    const five: Expression = Money.dollar(5)
    expect(Money.dollar(10).equals(five.times(2))).toBeTruthy()
    expect(Money.dollar(15).equals(five.times(3))).toBeTruthy()
  })

  test('should test equality between different currencies', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()
    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy()
  })

  test('should compare currency', () => {
    expect('USD').toEqual(Money.dollar(1).currency())
    expect('CHF').toEqual(Money.franc(1).currency())
  })

  test('reduceSum', () => {
    const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4))
    const bank: Bank = new Bank()
    const result: Money = bank.reduce(sum, 'USD')
    expect(Money.dollar(7).equals(result)).toBeTruthy()
  })

  test('plus should return Sum', () => {
    const five: Money = Money.dollar(5)
    const result: Expression = five.plus(five)
    const sum = result as Sum
    expect(five.equals(sum.augend)).toBeTruthy()
    expect(five.equals(sum.addend)).toBeTruthy()
  })

  test('should reduce money when arg is Money', () => {
    const bank: Bank = new Bank()
    const reduced = bank.reduce(Money.dollar(1), 'USD')
    expect(Money.dollar(1).equals(reduced))
  })

  test('should compare same currency rate for equality', () => {
    const bank: Bank = new Bank()
    expect(bank.rate('USD', 'USD'))
  })

  test('should reduce to different currency', () => {
    const bank: Bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const reduced = bank.reduce(Money.franc(2), 'USD')
    expect(Money.dollar(1).equals(reduced)).toBeTruthy()
  })

  test('should add mixed currencies', () => {
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const fiveDollars = new Money(5, 'USD')
    const tenFrancs = new Money(10, 'CHF')
    const sum = new Sum(fiveDollars, tenFrancs)
    expect(sum.reduce(bank, 'USD').equals(new Money(10, 'USD'))).toBeTruthy()
  })

  test('should sum expression with money', () => {
    const fiveDollars = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum = new Sum(fiveDollars, tenFrancs).plus(fiveDollars)
    const result = bank.reduce(sum, 'USD')
    expect(Money.dollar(15).equals(result))
  })

  test('should multiply sums', () => {
    const fiveDollars = Money.dollar(5)
    const tenFrancs = Money.franc(10)
    const bank = new Bank()
    bank.addRate('CHF', 'USD', 2)
    const sum = new Sum(fiveDollars, tenFrancs).plus(fiveDollars)
    const result = bank.reduce(sum.times(3), 'USD')
    expect(Money.dollar(45).equals(result))
  })
})
