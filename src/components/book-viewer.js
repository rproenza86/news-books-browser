import { html } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element.js";
import { connect } from "pwa-helpers/connect-mixin";
import { updateMetadata } from "pwa-helpers/metadata";

// This element is connected to the redux store.
import { store } from "../store.js";

import { fetchBook } from "../actions/book.js";
import { book, bookSelector } from "../reducers/book.js";

// We are lazy loading its reducer.
store.addReducers({
    book
});

let initCalled;
const callbackPromise = new Promise(r => (window.__initGoogleBooks = r));

function loadGoogleBooks() {
    if (!initCalled) {
        const script = document.createElement("script");
        script.src = "//www.google.com/books/api.js?callback=__initGoogleBooks";
        document.head.appendChild(script);
        initCalled = true;
    }
    return callbackPromise;
}

class BookViewer extends connect(store)(PageViewElement) {
    _render({ _item }) {
        if (_item) {
            const info = _item.volumeInfo;
            updateMetadata({
                title: `${info.title} - Books`,
                description: info.description,
                image: info.imageLinks.thumbnail.replace("http", "https")
            });
        }

        return html`
      <style>
        :host {
          display: block;
        }

        #viewer {
          width: 100%;
          height: 100%;
        }

        #viewer > div > div > div:nth-child(2) {
          display: none;
        }

        #viewer .overflow-scrolling {
          -webkit-overflow-scrolling: touch;
        }
      </style>

      <div id="viewer"></div>
    `;
    }

    static get properties() {
        return {
            _bookId: String,
            _item: Object
        };
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this._bookId = state.book.id;
        this._item = bookSelector(state);
    }

    _didRender({ _bookId, active }, changed, oldProps) {
        // google.books.Viewer requires the viewer to be visible when load(_bookId) is called
        if (
            changed &&
            ("active" in changed || "_bookId" in changed) &&
            active &&
            _bookId
        ) {
            loadGoogleBooks().then(() => {
                this._viewer = new google.books.DefaultViewer(
                    this.shadowRoot.querySelector("#viewer")
                );
                this._viewer.load(_bookId);
            });
        }
    }
}

window.customElements.define("book-viewer", BookViewer);

export { fetchBook };
