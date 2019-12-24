export interface T_fill_opt {
  only?: string[]
  except?: string[]
}

const def = {}

export class Fillable {
  [key: string]: any

  /**
   * Shallow fill `this`
   * @param obj
   */
  fill(obj: object, opt?: T_fill_opt) {
    opt = { ...def, ...opt }

    if (opt.only && opt.except) {
      throw new Error('Invalid options: `only` and `except` should not be passed at the same time.')
    }

    if (this.before_fill) {
      this.before_fill(obj, this)
    }

    const { only, except } = opt

    for (let key in obj) {

      if (
        only && !only.includes(key) ||
        except && except.includes(key)
      ) { continue }

      const value = obj[key]

      if (this.on_fill) {
        this.on_fill(value, key, obj)
      }

      this[key] = value
    }

    if (this.after_fill) {
      this.after_fill(obj, this)
    }
  }
}
