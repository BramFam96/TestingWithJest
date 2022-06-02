let { MarkovMachine } = require('./markov')
// Moved vars global
let text
let mm
// Moved to global scope

beforeEach(() => {
	text = `I wonder as I wander- will ever see the sea`
	mm = new MarkovMachine(text)
})
describe('MarkovConstructor', () => {
	test('constructor successfully turns string into arr', () => {
		expect(mm.words).toBeInstanceOf(Array)
	})

	test('constructor arr contains all the words from original string', () => {
		expect(mm.words.length).toEqual(text.split(' ').length)
	})

	test('constructor successfully generates a mapped object', () => {
		expect(mm.chains).toEqual(expect.any(Object))
	})
})

describe('Constructor chain mehod', () => {
	test('constructor chain is the correct size', () => {
		let count = 0
		while (mm.words.length > 0) {
			let w = mm.words.pop()
			if (!mm.words.includes(w)) {
				count += 1
			}
		}
		expect(count).toEqual(mm.chains.size)
	})
})

describe('Constructor make text method', () => {
	test('text is less than or equal to numWords', () => {
		let madeText = mm.makeText(10)
		let wordCount = madeText.split(' ').length
		expect(wordCount).toBeLessThanOrEqual(10)
		let madeText2 = mm.makeText(1)
		let wordCount2 = madeText2.split(' ').length
		expect(wordCount2).toEqual(1)
	})
})
