import { LitElement, html } from "@polymer/lit-element";
import { searchIcon } from "./book-icons.js";

class NewsBookInputDecorator extends LitElement {
    _render({ _focused }) {
        return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 4px 2px;
          box-sizing: border-box;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
          background-color: rgba(255, 255, 255, 0.9);
        }

        .icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          padding: 8px;
          box-sizing: border-box;
        }

        .decorator {
          flex: 1;
          position: relative;
          margin: 0 2px;
          border-bottom: 1px solid #bbb;
        }

        .decorator > ::slotted(input) {
          font-size: 1em;
          font-weight: 400;
          border: none;
          width: 100%;
          padding: 0 0 1px 0;
          background: transparent;
          font-family: inherit;
          outline: none;
          -webkit-appearance: none;
        }

        .underline {
          display: block;
          height: 2px;
          width: 100%;
          background-color: var(--app-secondary-color, navy);
          position: absolute;
          bottom: -2px;
          left: 0;
          will-change: transform;
          transform: scale3d(0, 1, 1);
          transition: transform 0.2s ease-in;
        }

        [focused] > .underline {
          transform: scale3d(1, 1, 1);
          transition: transform 0.2s ease-out;
        }
      </style>

      <div class="icon">${searchIcon}</div>
      <div class="decorator" focused?="${_focused}">
        <slot id="inputSlot" name="input"></slot>
        <div class="underline"></div>
      </div>
      <slot name="button"></slot>
    `;
    }

    static get properties() {
        return {
            _focused: Boolean
        };
    }

    async _firstRendered() {
        // Do all setup work after the first render.
        await this.renderComplete;
        // Assume the input is in the slot
        this._input = this.shadowRoot
            .querySelector("#inputSlot")
            .assignedNodes({ flatten: true })[0];
        this._input.addEventListener("focus", () => (this._focused = true));
        this._input.addEventListener("blur", () => (this._focused = false));
    }
}

window.customElements.define(
    "news-book-input-decorator",
    NewsBookInputDecorator
);
