const fs = require('fs')
const { MarkovMachine } = require('./markov')
const axios = require('axios')
const process = require('process')

const makeMM = (text) => {
	return new MarkovMachine(text)
}
const logResults = (mm) => {
	console.log(mm.makeText())
}
// Handle path to local file!
const generateTextFromFile = (path) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Cannot read file at ${path}`, err)
			process.exit(1)
		} else {
			let mm = makeMM(data)
			logResults(mm)
		}
	})
}
// Handle path to url
const generateTextFromUrl = async (path) => {
	let res
	try {
		res = await axios.get(path)
	} catch (err) {
		console.error(`Cannot read data at ${path}`, err)
		process.exit(1)
	}
	let mm = makeMM(res.data)
	logResults(mm)
}
// Distinguish files from urls:

let [type, path] = process.argv.slice(2)
if (type === 'file') {
	generateTextFromFile(path)
} else if ((type = 'url')) {
	generateTextFromUrl(path)
} else {
	console.error(`Expected type to be file or url, not ${type}`)
}
