import { SolvePuzzle } from '../../util/interfaces/SolvePuzzle'

export const SolveRandomizedWordSequence = (sequence: string) => {
  const numberWords = [
    { word: 'zero', uniqueChar: 'z', value: 0 },
    { word: 'one', uniqueChar: 'o', value: 1 },
    { word: 'two', uniqueChar: 'w', value: 2 },
    { word: 'three', uniqueChar: 'h', value: 3 },
    { word: 'four', uniqueChar: 'u', value: 4 },
    { word: 'five', uniqueChar: 'f', value: 5 },
    { word: 'six', uniqueChar: 'x', value: 6 },
    { word: 'seven', uniqueChar: 'v', value: 7 },
    { word: 'eight', uniqueChar: 'g', value: 8 },
    { word: 'nine', uniqueChar: 'i', value: 9 },
    { word: 'ten', uniqueChar: 't', value: 10 },
  ]

  //requency map for all characters in the sequence
  const charCount: { [key: string]: number } = {}
  for (const char of sequence) {
    charCount[char] = (charCount[char] || 0) + 1
  }

  const result: SolvePuzzle[] = []

  //Iterate  and count occurrences
  numberWords.forEach(({ word, uniqueChar, value }) => {
    // If the unique character exists in the sequence, count how many times
    const count = charCount[uniqueChar] || 0
    if (count > 0) {
      result.push({ value, word, count })

      //Reduce the frequency of characters forming this word
      for (const char of word) {
        charCount[char] -= count
      }
    }
  })

  return result
}
