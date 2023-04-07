import { Dollar, Franc } from '../src'

describe('operations', () => {
  test('dollar multiplication', () => {
    const five: Dollar = new Dollar(5)
    expect(new Dollar(10).equals(five.times(2))).toBeTruthy()
    expect(new Dollar(15).equals(five.times(3))).toBeTruthy()
  })

  test('should test equality', () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy()
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy()
    expect(new Franc(5).equals(new Franc(5))).toBeTruthy()
    expect(new Franc(5).equals(new Franc(6))).toBeFalsy()
    expect(new Franc(5).equals(new Dollar(5))).toBeTruthy()
  })

  test('franc multiplication', () => {
    const five: Franc = new Franc(5)
    expect(new Franc(10).equals(five.times(2))).toBeTruthy()
    expect(new Franc(15).equals(five.times(3))).toBeTruthy()
  })
})
