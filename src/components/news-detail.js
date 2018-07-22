import { html } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element.js";
import { repeat } from "lit-html/lib/repeat";
import { unsafeHTML } from "lit-html/lib/unsafe-html";
import { connect } from "pwa-helpers/connect-mixin";
import { updateMetadata } from "pwa-helpers/metadata";

import { BookButtonStyle } from "./shared-styles.js";
import { favoriteIcon, favoriteBorderIcon } from "./book-icons.js";
import "./book-rating.js";
import "./book-offline.js";
import "./news-image.js";

// This element is connected to the redux store.
import { store } from "../store.js";

import { refreshPage } from "../actions/app.js";
import { getANews } from "../actions/aNews.js";
import { saveFavorite } from "../actions/favorites.js";
import { aNews, aNewsSelector } from "../reducers/aNews.js";

// We are lazy loading its reducer.
store.addReducers({
    aNews
});

class NewsDetail extends connect(store)(PageViewElement) {
    _render({
        _item,
        _favorites,
        _lastVisitedListPage,
        _showOffline,
        _isSignedIn
    }) {
        // Don't render if there is no item.
        if (!_item) {
            return;
        }
        const info = _item.headline.main;
        const accessInfo = _item.snippet;
        const title = _item.headline.print_headline;
        const author = _item.byline.original;
        const date = new Date(_item.pub_date).getFullYear();
        const pageCount = _item.print_page;
        const rating = Math.floor(Math.random() * (5 - 1)) + 1;
        const ratingsCount = _item.word_count;
        const publisher = _item.source;
        const defaultSrc =
            "data:image/svg+xml," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'
            );
        const thumbnail =
            _item.imgSrcObject && _item.imgSrcObject
                ? _item.imgSrcObject.original || _item.imgSrcObject.thumb
                : defaultSrc;
        const poster = thumbnail.replace("&zoom=1", "");
        const categories = _item.keywords || [];
        const identifiers = _item.industryIdentifiers || [];
        const isFavorite = false;

        updateMetadata({
            title: `News - ${title} `,
            description: _item.description,
            image: thumbnail
        });

        return html`
      ${BookButtonStyle}
      <style>
        :host {
          display: block;
          padding: 24px 16px;
        }

        section {
          max-width: 748px;
          box-sizing: border-box;
          font-weight: 300;
        }

        .info {
          display: flex;
          padding-bottom: 16px;
          border-bottom: 1px solid #c5c5c5;
        }

        .cover {
          position: relative;
        }

        .cover::after {
          content: '';
          display: block;
          padding-top: 160%;
          width: 100px;
        }

        .cover > news-image {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          margin: 0 auto;
        }

        .info-desc {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-left: 16px;
          font-size: 14px;
        }

        .flex {
          flex: 1;
        }

        .title {
          margin: 0 0 4px;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
        }

        .info-item {
          padding-top: 8px;
        }

        .desc {
          padding: 8px 0;
          font-size: 15px;
          line-height: 1.8;
        }

        .desc > h3 {
          font-size: 15px;
          font-weight: 500;
        }

        .desc > ul {
          margin-bottom: 0;
        }

        news-rating {
          margin-right: 6px;
        }

        .rating-container {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #c5c5c5;
          font-size: 14px;
        }

        .fav-btn-container,
        .preview-btn-container {
          padding-top: 16px;
        }

        .fav-btn-container {
          height: 32px;
        }

        .fav-button {
          display: flex;
          align-items: center;
          width: 156px;
          margin: 0 8px 0 0;
          padding: 0;
          background: transparent;
          border: 0;
          -webkit-appearance: none;
          font-size: 12px;
          cursor: pointer;
        }

        .fav-button > svg {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }

        [hidden] {
          display: none !important;
        }

        /* desktop screen */
        @media (min-width: 648px) {
          :host {
            padding: 48px 24px 24px;
          }

          section {
            margin: 0 auto;
          }

          .info {
            padding-bottom: 24px;
          }

          .cover::after {
            width: 128px;
          }

          .info-desc {
            margin-left: 24px;
          }

          .title {
            margin-bottom: 8px;
            font-size: 24px;
            line-height: 1.3;
          }

          .fav-btn-container,
          .preview-btn-container {
            display: flex;
            justify-content: flex-end;
          }

          .preview-btn-container {
            padding-bottom: 24px;
          }

          .rating-container {
            padding: 24px 0;
          }

          .desc {
            padding: 16px 0;
          }
        }
      </style>

      <section hidden?="${_showOffline}">
        <div class="info">
          <div class="cover" hero>
            <news-image src="${thumbnail}" alt="${title}"></news-image>
          </div>
          <div class="info-desc">
            <h2 class="title">${title}</h2>
            <div class="info-item" hidden?="${!author}">${author} - ${date}</div>
            <div class="info-item" hidden?="${!pageCount}" desktop>${pageCount} pages</div>
            <div class="info-item" hidden?="${!publisher}" desktop>${publisher} - publisher</div>
            <div class="flex"></div>
            <div class="fav-btn-container" hidden?="${_lastVisitedListPage ===
                "favorites"}">
              <button class="fav-button" on-click="${() =>
                  store.dispatch(
                      saveFavorite(_item, isFavorite)
                  )}" hidden?="${!_isSignedIn}">
                ${isFavorite ? favoriteIcon : favoriteBorderIcon} ${
            isFavorite ? "Added to Favorites" : "Add to Favorites"
        }
              </button>
            </div>
            <div class="preview-btn-container">
              <a href="/viewer/${
                  _item.id
              }" class="news-button" hidden?="${!accessInfo.embeddable}">PREVIEW</a>
            </div>
          </div>
        </div>
        <div class="rating-container">
          <news-rating rating="${rating}"></news-rating>
          <span>(${ratingsCount || 0} ${
            ratingsCount == 1 ? "review" : "reviews"
        })</span>
        </div>
        <div class="desc">
          <h3>Headline</h3>
          ${unsafeHTML(accessInfo || "None")}
        </div>
        <div class="desc" hidden?="${categories.length === 0}">
          <h3>Categories</h3>
          <ul>
            ${repeat(
                categories,
                item => html`
              <li>${item.value}</li>
            `
            )}
          </ul>
        </div>
        <div class="desc" hidden?="${identifiers.length === 0}">
          <h3>ISBN</h3>
          <ul>
            ${repeat(
                identifiers,
                item => html`
              <li>${item.type}: ${item.identifier}</li>
            `
            )}
          </ul>
        </div>
        <div class="desc">
          <h3>Original publication</h3>
          <iframe id="inlineFrameExample" title="Inline Frame Example" width="100%" height="500px" src="${
              _item.web_url
          }">
</iframe>
        </div>
      </section>

      <news-offline hidden?="${!_showOffline}" on-refresh="${() =>
            store.dispatch(refreshPage())}"></news-offline>
    `;
    }

    static get properties() {
        return {
            _item: Object,
            _favorites: Object,
            _lastVisitedListPage: Boolean,
            _showOffline: Boolean,
            _isSignedIn: Boolean
        };
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        this._item = aNewsSelector(state);
        this._favorites = state.favorites && state.favorites.items;
        this._lastVisitedListPage = state.app.lastVisitedListPage;
        this._showOffline = state.app.offline && state.news.failure;
        this._isSignedIn = !!state.auth.user;
    }
}

window.customElements.define("news-detail", NewsDetail);

export { getANews };
