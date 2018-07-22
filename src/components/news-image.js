import { LitElement, html } from "@polymer/lit-element";

class NewsImage extends LitElement {
    _render({ alt, placeholder, src, _loaded }) {
        return html`
      <style>
        :host {
          display: block;
          position: relative;
        }

        #placeholder {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }

        :host([blur-up]) #placeholder {
          background-position: center 10%;
          background-size: 80%;
          background-repeat: no-repeat;
          filter: blur(3px);
          will-change: filter;
        }

        :host([blur-up]) #placeholder[loaded] {
          filter: blur(0);
          transition: 0.2s filter ease-in-out;
        }

        img {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          max-width: 100%;
          max-height: 100%;
          margin: 0 auto;
          opacity: 0;
        }

        :host([center]) img {
          left: -9999px;
          right: -9999px;
          max-width: none;
        }

        #placeholder[loaded] img {
          opacity: 1;
          transition: 0.5s opacity;
        }
      </style>

      <div id="placeholder" style$="${
          placeholder ? `background-image: url('${placeholder}')` : ""
      }" loaded?="${_loaded}">
        <img src="${src}" alt="${alt}"
            on-load="${() => this._onImgLoad()}"
            on-error="${() => this._onImgError()}">
      </div>
    `;
    }

    static get properties() {
        return {
            alt: String,
            src: String,
            placeholder: String,
            _loaded: Boolean
        };
    }

    _propertiesChanged(props, changed, oldProps) {
        if (changed && "src" in changed) {
            props._loaded = false;
        }
        super._propertiesChanged(props, changed, oldProps);
    }

    _onImgLoad() {
        this._loaded = true;
        this.placeholder = null;
    }

    _onImgError() {
        if (!this.placeholder) {
            this.src =
                "data:image/svg+xml," +
                encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'
                );
        }
    }
}

customElements.define("news-image", NewsImage);
