// Helper function to get a object by a path.
export const get = (value, path) =>
  path.split('.').reduce((acc, key) => {
    if (Array.isArray(acc)) {
      return acc.map(x => x[key])
    }

    return acc ? acc[key] : null
  }, value)
