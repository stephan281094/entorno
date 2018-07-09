import { get } from './util'

export default class Search {
  constructor(values, options) {
    this._values = values
    this._keys = options.keys
  }

  search(criteria) {
    const _criteria = criteria.trim().toLowerCase()

    return this._values.filter(value =>
      this._keys.some(key => {
        const result = get(value, key)

        if (Array.isArray(result)) {
          return result.some(entry => entry.toLowerCase().includes(_criteria))
        }

        return get(value, key)
          .toLowerCase()
          .includes(_criteria)
      })
    )
  }
}
