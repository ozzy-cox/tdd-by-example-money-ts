import { Money } from '../src'

describe('operations', () => {
  test('dollar multiplication', () => {
    const five: Money = Money.dollar(5)
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

  test('should add two of the same currecy', () => {
    expect(Money.dollar(5).plus(Money.dollar(5)).equals(Money.dollar(10)))
  })
})
