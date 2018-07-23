import { html } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element.js";
import { repeat } from "lit-html/lib/repeat";
import { connect } from "pwa-helpers/connect-mixin";
import { updateMetadata } from "pwa-helpers/metadata";

import "./news-image.js";
import "./news-item.js";
import "./book-offline.js";

// This element is connected to the redux store.
import { store } from "../store.js";

import { searchNews } from "../actions/news.js";
import { refreshPage } from "../actions/app.js";
import { news, itemListSelector } from "../reducers/news.js";

// We are lazy loading its reducer.
store.addReducers({
    news
});

class NewsExplore extends connect(store)(PageViewElement) {
    _render({ _query, _items, _showOffline }) {
        updateMetadata({
            title: `${_query ? `News - ${_query}` : ""}`,
            description: "Search for news"
        });

        return html`
      <style>
        :host {
          display: block;
        }

        .books {
          max-width: 432px;
          margin: 0 auto;
          padding: 8px;
          box-sizing: border-box;
          /* remove margin between inline-block nodes */
          font-size: 0;
        }

        li {
          display: inline-block;
          position: relative;
          width: calc(100% - 16px);
          max-width: 400px;
          min-height: 240px;
          margin: 8px;
          font-size: 14px;
          vertical-align: top;
          background: #fff;
          border-radius: 2px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          list-style: none;
        }

        li::after {
          content: '';
          display: block;
          padding-top: 65%;
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

        [hidden] {
          display: none !important;
        }

        /* Wide Layout */
        @media (min-width: 648px) {
          li {
            height: 364px;
          }

          .books-desc {
            padding: 96px 16px 0;
          }
        }

        /* Wider layout: 2 columns */
        @media (min-width: 872px) {
          .books {
            width: 832px;
            max-width: none;
            padding: 16px 0;
          }
        }
      </style>

      <section hidden?="${_showOffline}">
        <ul class="books" hidden?="${!_query}">
          ${repeat(
              _items,
              item => html`
            <li>
              <news-item item="${item}"></news-item>
            </li>
          `
          )}
        </ul>

        <news-image
          class="books-bg"
          alt="News Home"
          center
          src="images/src/news-bg.jpg"
          hidden?="${_query}"
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAAI0lEQVR4AWPw2v7Wfe1Dj7X3/Pd8YPDf+Uqva79x38GQvW8Bu0sOexptskUAAAAASUVORK5CYII=">
        </news-image>

        <div class="books-desc" hidden?="${_query}">Search news in one of the world's unparalleled source of news and information.</div>
      </section>

      <book-offline hidden?="${!_showOffline}" on-refresh="${() =>
            store.dispatch(refreshPage())}"></book-offline>
    `;
    }

    static get properties() {
        return {
            _query: String,
            _items: Array,
            _showOffline: Boolean
        };
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this._query = state.news.query;
        this._items = itemListSelector(state);
        this._showOffline = state.app.offline && state.news.failure;
    }
}

window.customElements.define("news-explore", NewsExplore);

export { searchNews, refreshPage };
