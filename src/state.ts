import { Option, none, some } from "fp-ts/Option";
import { createStore } from "redux";
import { getRandomWords, Sentence, Word } from "./model";

// TODO remove export
const words: Map<Word, string[]> = new Map([
    ["Subject", ["Francois", "Ocaml", "Rust"]],
    ["Verb", ["mange", "bois", "fume", "flamboie"]],
    ["Adjective", ["le beau", "le merveilleux", "le sale"]]
]);

export interface State {
    sentence: Sentence
    generated: Option<string[]>
}

const initState: State = {
    sentence: ["Adjective", "Subject", "Verb"],
    generated: none
}

export interface GenerateExquisite {
    type: "GenerateExquisite"
}

export interface Reset {
    type: "Reset"
}

export interface UpdateSentence {
    type: "UpdateSentence"
    newSentence: Sentence
}

export type Actions = GenerateExquisite | Reset | UpdateSentence


const reducer = (state: State = initState, action: Actions) => {
    switch (action.type) {
        case "GenerateExquisite":
            return { ...state, generated: some(state.sentence.map(type => getRandomWords(words, type))) }
        case "Reset":
            return { ...state, generated: none }
        case "UpdateSentence":
            return { ...state, sentence: action.newSentence, generated: none }
        default:
            return state
    }
}

export const store = createStore(reducer)