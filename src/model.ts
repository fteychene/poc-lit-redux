

export type Sentence = Word[]

export type Word = "Subject" | "Verb" | "Adjective"

export function getRandomWords(words: Map<Word, string[]>, word: Word): string {
    let wordsForType = words.get(word)
    if (wordsForType != undefined) {
        return wordsForType[Math.floor(Math.random() * wordsForType.length)];
    }
    return ""
}
