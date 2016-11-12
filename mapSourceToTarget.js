const fs = require('fs')

const _source = fs.readFileSync('source.json', 'utf-8')
const _target = fs.readFileSync('target.json', 'utf-8')


const MSG = {
  invalidTargetJSON: 'Target json file is invalid.',
  invalidSouceJSON: 'Source json file is invalid'
}

// Parse `source.json' file
// Throw an error, when it is invalid
const data = {
  source: {},
  target: {},
  output: {}
}

try {
  data.source = JSON.parse(_source)
} catch (e) {
  throw new Error(MSG.invalidTargetJSON)
}

// Parse 'target.json' file
// Throw an error, when it is invalid
try {
  data.target = JSON.parse(_target)
} catch (e) {
  throw new Error(MSG.invalidSouceJSON)
}


const getKeys = data => {
  const keys = []
  data.forEach(item => {
    keys.push(item.key)
  })

  return keys
}

// keys = getKeys(data.target)


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

// Array.prototype.findIndex()
data.source.forEach(item => { 
  item = flattenArray(item)
})



const _output = fs.writeFile(
  'output.json',
  JSON.stringify(data.source, null, 2), () => {
})


