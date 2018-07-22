import { LitElement, html } from "@polymer/lit-element";

import { BookButtonStyle } from "./shared-styles.js";

class BookOffline extends LitElement {
    _render() {
        return html`
      ${BookButtonStyle}
      <style>
        :host {
          padding: 16px;
          text-align: center;
          line-height: 1.5;
        }
      </style>

      <section>
        <h3>Oops! You are offline and the request resource is unavailable.</h3>
        <button class="book-button" on-click="${() =>
            this._refresh()}">Try Again...</button>
      </section>
    `;
    }

    _refresh() {
        this.dispatchEvent(new CustomEvent("refresh", { composed: true }));
    }
}

window.customElements.define("book-offline", BookOffline);
