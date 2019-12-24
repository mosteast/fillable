import { Fillable } from './fillable'

it('should fill', async () => {
  const fillable = new Fillable()
  fillable.a = 1
  fillable.b = 2

  fillable.fill({ a: 11 })
  expect(fillable.a).toBe(11)
  expect(fillable.b).toBe(2)
})

it('should apply `only` option', async () => {
  const fillable = new Fillable()
  fillable.a = 1
  fillable.b = 2
  fillable.c = 3

  fillable.fill({ a: 11, b: 22 }, { only: [ 'a' ] })
  expect(fillable.a).toBe(11)
  expect(fillable.b).toBe(2)
  expect(fillable.c).toBe(3)
})

it('should apply `except` option', async () => {
  const fillable = new Fillable()
  fillable.a = 1
  fillable.b = 2
  fillable.c = 3

  fillable.fill({ a: 11, b: 22, c: 33 }, { except: [ 'a', 'b' ] })
  expect(fillable.a).toBe(1)
  expect(fillable.b).toBe(2)
  expect(fillable.c).toBe(33)
})

it('should throw when `only` and `except` passed at the same time', async () => {
  const fillable = new Fillable()

  expect(() => {
    fillable.fill({}, { only: [], except: [] })
  }).toThrow()
})
