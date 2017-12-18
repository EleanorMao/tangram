export default {
  equal (stateName, value) {
    if (typeof value === 'boolean') {
      return `${value === true && '!'}!${stateName}`
    } else {
      return `${stateName} == ${value}`
    }
  },
  lt (stateName, value) {
    return `${stateName} < ${value}`
  },
  gt (stateName, value) {
    return `${stateName} > ${value}`
  },
  lte (stateName, value) {
    return `${stateName} <= ${value}`
  },
  gte (stateName, value) {
    return `${stateName} >= ${value}`
  },
  ternary (stateName, value) {
    return `${stateName} ? ${value} :`
  }
}
