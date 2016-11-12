const getTargetKeys = data => {
  const keys = []
  data.forEach(item => {
    keys.push(item.key)
  })

  return keys
}

const getSourceASIN = data => {
  const keys = []
  data.forEach(item => {
    keys.push(item.ASIN)
  })

  return keys
}

// Function replace ['String'] with 'String'
// If array.length not equals 1 — return same array
const replaceArrayWithString = array => {
  if (Array.isArray(array)) {
    if (array.length === 1) {
      return array[0]
    }
  }

  return array
}

const flattenArray = item => {
  // Iterate over keys is json object
  for (const key in item) {

    // Also replace ['String'] with 'String'
    // Replace [{Object}] with {Object}
    item[key] = replaceArrayWithString(item[key])

    // Check if the element with current key is string
    // It could be also ['String'] — case we need to flatten
    const isString = typeof item[key][0] === 'string'
    if (!isString) {
      // Going deeper to the nested object
      flattenArray(item[key]) 
    }
  }

  return item
}

const mapSourceToTarget = (source, target) => {
  source.forEach(item => { 
    // Prettify objects in source.
    item = flattenArray(item)
  })

  const keys = {}
  keys.source = getSourceASIN(source)
  keys.target = getTargetKeys(target)

  // Iterate over target keys
  for (key in keys.target) {
    // console.log(keys.target[key])
    // Find a pair in source keys
    const index = keys.source.findIndex(item => {
      return item === keys.target[key]
    })
    // -1 is when nothing found
    if (index > -1) {
      const sourceIndex = Number(index)
      const targetIndex = Number(key)

      // Merging objects
      target[targetIndex] = Object.assign(
        target[targetIndex], source[sourceIndex]
      )
    }
  }

  return target
}

module.exports = mapSourceToTarget