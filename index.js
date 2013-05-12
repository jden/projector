var _ = require('funderscore')
var projector = function (projection) {
  return function (obj) {
    return _.reduce(projection, function (out, val, key) {
      if (!val) { return out }
      out[key] = typeof val === 'function'
        ? val(obj[key], key, obj)
        : obj[key]
      return out
    })
  }
}

// creates a function to add calculated values to an object
projector.add = function (projection) {
  if (!_.every(projection, function (val) {
    return typeof val === 'function'
  })) {
    throw new TypeError('leaves must be functions')
  }

  return function (obj) {
    _.forEach(projection, function (val, key) {
      obj[key] = val(obj)
    })
    return obj
  }
}

module.exports = projector