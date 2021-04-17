import "./my-word-dislay";
import "./my-sentence-selector"
import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { Option, none, map, getOrElse } from 'fp-ts/Option'
import { pipe } from "fp-ts/function";
import { State, store } from "./state";
import { connect } from 'pwa-helpers'



@customElement('my-exquisite-cadaver')
export class MyExquisiteCadaver extends connect(store)(LitElement) {

    @property({ attribute: false })
    value: Option<string[]> = none

    @property({ type: Boolean })
    updateSentence: boolean = false

    stateChanged(state: State) {
        this.value = state.generated
    }

    renderWordList(words: string[]): TemplateResult {
        return words
            .map(word => html`<div class="rounded-md ml-2 flex-1"><my-word-display word=${word}></my-word-display></div>`)
            .reduce((x, y) => html`${x}${y}`)
    }

    renderNoValue(): TemplateResult {
        return html`<div>Start playing by clicking the button</div>`
    }

    renderSentencerSelector(): TemplateResult {
        return html`<my-sentence-selector></my-sentence-selector>`
    }

    render() {
        return html`
            <h1 class="text-4xl"> Bonjour twitch </h1>
            <div class="p-3">
                ${this.updateSentence ? this.renderSentencerSelector() : html``}
                <button class="background-transparent font-bold px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click=${() => this.updateSentence = !this.updateSentence}>
                    > ${this.updateSentence ? `Hide` : `Update sentence`}
                </button> 
            </div>
            <div class="flex flex-row pb-5">
                ${pipe(this.value, map(this.renderWordList), getOrElse(this.renderNoValue))}
            </div>
            <button class="bg-blue-200 active:bg-blue-300 font-bold text-xs px-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click=${() => store.dispatch({ type: "GenerateExquisite" })}>Start !</button>
            <button class="bg-blue-200 active:bg-blue-300 text-xs px-3 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" @click=${() => store.dispatch({ type: "Reset" })}>Reset</button>
        `
    }

    createRenderRoot() {
        return this
    }
}

