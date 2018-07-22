import { LitElement, html } from "@polymer/lit-element";

import "./book-image.js";

class BookHome extends LitElement {
    _render() {
        return html`
      <style>
        :host {
          display: block;
        }

        .books-bg {
          height: 300px;
          max-width: 570px;
          margin: 0 auto;
        }

        .books-desc {
          padding: 24px 16px 0;
          text-align: center;
        }

        /* Wide Layout */
        @media (min-width: 648px) {
          .books-desc {
            padding: 96px 16px 0;
          }
        }
      </style>

      <book-image class="books-bg" alt="Books Home" center src="images/books-bg.jpg" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAAI0lEQVR4AWPw2v7Wfe1Dj7X3/Pd8YPDf+Uqva79x38GQvW8Bu0sOexptskUAAAAASUVORK5CYII="></book-image>

      <div class="books-desc">Search the world's most comprehensive index of full-text books.</div>
    `;
    }
}

window.customElements.define("book-home", BookHome);
