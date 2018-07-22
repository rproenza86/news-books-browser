import { LitElement, html } from "@polymer/lit-element";
import { unsafeHTML } from "lit-html/lib/unsafe-html.js";

import "./news-image.js";
import "./book-rating.js";

class NewsItem extends LitElement {
    _render({ item }) {
        const info = item;
        const id = item ? item._id : "";
        const title =
            info && info.headline && info.headline.main
                ? info.headline.main
                : "";
        const author =
            info && info.byline && info.byline.original
                ? info.byline.original
                : "";
        const defaultSrc =
            "data:image/svg+xml," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'
            );
        const thumbnail =
            info && info.imgSrcObject
                ? info.imgSrcObject.original || info.imgSrcObject.thumb
                : defaultSrc;
        const date = info ? new Date(info.pub_date).getFullYear() : "";
        const rating = info && info.score ? Math.round(info.score) * 10 : 0;
        const desc = info
            ? unsafeHTML(info.snippet || "<i>No descriptions.</i>")
            : "";

        return html`
      <style>
        :host {
          display: block;
        }

        a,
        .placeholder {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          color: inherit;
          text-decoration: none;
        }

        .info {
          display: flex;
          flex-direction: row-reverse;
        }

        .desc {
          position: relative;
          flex: 1;
          margin: 8px 12px;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.5;
          overflow: hidden;
        }

        .desc::after {
          content: '';
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 40px;
        }

        news-image {
          width: 96px;
          pointer-events: none;
        }

        news-image::before {
          content: "";
          display: block;
          padding-top: 160%;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 8px 8px 8px 16px;
          font-size: 14px;
          font-weight: 300;
          overflow: hidden;
        }

        .title-container {
          display: flex;
        }

        .title {
          position: relative;
          flex: 1;
          margin: 0 6px 0 0;
          box-sizing: border-box;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0.1px;
          line-height: 1.2;
        }

        .author {
          line-height: 1.4;
        }

        .info-item {
          padding-top: 8px;
        }

        [hidden] {
          display: none !important;
        }

        .placeholder {
          animation: shimmer 1s infinite linear forwards;
          background: #f6f7f8;
          background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
          background-size: 800px 104px;
        }

        .placeholder[fadeout] {
          animation-iteration-count: 2;
          transition: 0.5s opacity;
          opacity: 0;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% {
            background-position: -468px 0
          }
          100% {
            background-position: 468px 0
          }
        }

        .placeholder-info {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(100% - 96px);
          height: 154px;
          box-sizing: border-box;
          border-top: 8px solid #fff;
          border-right: 30px solid #fff;
          border-bottom: 66px solid #fff;
          border-left: 16px solid #fff;
        }

        .placeholder-info-inner-1 {
          height: 12px;
          margin-top: 24px;
          background: #fff;
        }

        .placeholder-info-inner-2 {
          height: 12px;
          margin-top: 16px;
          background: #fff;
        }

        .placeholder-desc {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 154px);
          box-sizing: border-box;
          border-top: 8px solid #fff;
          border-right: 30px solid #fff;
          border-bottom: 8px solid #fff;
          border-left: 12px solid #fff;
        }

        /* Wide layout */
        @media (min-width: 648px) {
          .info {
            flex-direction: row;
          }

          .info-section {
            padding: 16px;
          }

          .desc {
            margin: 8px 16px;
          }

          news-image {
            width: 128px;
          }

          .title {
            font-size: 20px;
          }

          .info-item {
            padding-top: 12px;
          }

          .placeholder-info {
            top: 0;
            right: 0;
            bottom: calc(100% - 205px);
            left: auto;
            width: calc(100% - 128px);
            height: auto;
            border-top: 16px solid #fff;
            border-right: 30px solid #fff;
            border-bottom: 104px solid #fff;
            border-left: 16px solid #fff;
          }

          .placeholder-info-inner-1 {
            height: 12px;
            margin-top: 30px;
            background: #fff;
          }

          .placeholder-info-inner-2 {
            height: 12px;
            margin-top: 16px;
            background: #fff;
          }

          .placeholder-desc {
            height: calc(100% - 205px);
            border-top: 16px solid #fff;
            border-right: 30px solid #fff;
            border-bottom: 30px solid #fff;
            border-left: 16px solid #fff;
          }
        }
      </style>

      <a href="/news-detail/${id}">
        <div class="info">
          <news-image src="${thumbnail}" alt="${title}"></news-image>
          <div class="info-section">
            <div class="title-container">
              <h2 class="title">${title}</h2><slot></slot>
            </div>
            <div class="author info-item" hidden?="${!author}">${author} - ${date}</div>
            <div class="info-item" hidden?="${!info}">
              <news-rating rating="${rating}"></news-rating>
            </div>
          </div>
        </div>
        <div class="desc">${desc}</div>
      </a>

      <div class="placeholder" fadeout?="${info}">
        <div class="placeholder-info">
          <div class="placeholder-info-inner-1"></div>
          <div class="placeholder-info-inner-2"></div>
        </div>
        <div class="placeholder-desc"></div>
      </div>
    `;
    }

    static get properties() {
        return {
            item: Object
        };
    }
}

window.customElements.define("news-item", NewsItem);
