import { customElement, html, LitElement, property } from "lit-element";

@customElement("my-word-display")
export class MyWordDisplay extends LitElement {

    // TODO question - Have we to really use a property for a read only var given to the element ?
    @property()
    word: string = ""

    render() {
        return html`<div class="shadow-md p-2 text-center font-extrabold">${this.word}</div>`
    }

    createRenderRoot() {
        return this
    }

}