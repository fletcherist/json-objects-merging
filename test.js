const mapSourceToTarget = require('./mapSourceToTarget')

const fs = require('fs')

const _source = fs.readFileSync('source.json', 'utf-8')
const _target = fs.readFileSync('target.json', 'utf-8')


const MSG = {
  invalidTargetJSON: 'Target json file is invalid.',
  invalidSouceJSON: 'Source json file is invalid'
}

const data = {
  source: {},
  target: {},
  output: {}
}

// Parse `source.json' file
// Throw an error, when it is invalid
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


const result = mapSourceToTarget(data.source, data.target)
const _output = fs.writeFile(
  'output.json',
  JSON.stringify(result, null, 2), () => {
})
