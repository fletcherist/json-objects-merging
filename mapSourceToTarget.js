const fs = require('fs')

const _source = fs.readFileSync('source.json', 'utf-8')
const _target = fs.readFileSync('target.json', 'utf-8')


// const _output = fs.writeFile('output.json', _target, () => {
	
// })

console.log(_source)