import { customElement, html, LitElement, property } from "lit-element";
import { connect } from "pwa-helpers";
import { State, store, UpdateSentence } from "./state";
import { none, Option, some } from "fp-ts/Option"
import { Word } from "./model";
import { Show } from "fp-ts/Show";
import { identity, pipe } from "fp-ts/function";

import * as A from 'fp-ts/Array'
import * as O from 'fp-ts/Option'

class WordShow implements Show<Word> {
    show: (a: Word) => string = identity

}

const asWord: (x: string) => Option<Word> = (x) => {
    if (["Subject", "Adjective", "Verb"].includes(x)) {
        return some(x as Word)
    }
    return none
}

@customElement('my-sentence-selector')
export class MySentenceSelector extends connect(store)(LitElement) {

    @property({ type: String })
    separator: string = ' '

    @property({ attribute: false })
    sentenceValue: string = ""

    @property({ attribute: false })
    error: Option<string> = none

    stateChanged(state: State) {
        let show = new WordShow()
        this.sentenceValue = state.sentence.map(x => show.show(x)).reduce((x, y) => `${x}${this.separator}${y}`)
    }

    updateSentence() {
        pipe(
            A.array.traverse(O.option)(this.sentenceValue.trim().split(this.separator), asWord),
            O.fold(
                () => { this.error = some("Invalid new sentence") },
                (x) => {
                    store.dispatch({
                        type: "UpdateSentence",
                        newSentence: x
                    } as UpdateSentence)
                    this.error = none
                }
            )
        )
    }

    render() {
        return html`
            <div> 
                <input class="py-1 p-0.5 bg-white bg-white text-xs border-0 shadow outline-none focus:outline-none w-max" 
                    value=${this.sentenceValue} @change=${(e: { target: { value: string; }; }) => this.sentenceValue = e.target.value} /> 
                <button class="w-1/5 bg-blue-200 active:bg-blue-300 text-xs py-1 shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click=${() => this.updateSentence()}>Update</button>
                ${pipe(this.error, O.map(x => html`<span>${x}</span>`), O.getOrElse(() => html``))}
            </div> 
        `
    }

    createRenderRoot() {
        return this
    }

}