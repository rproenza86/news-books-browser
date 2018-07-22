import { html } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element.js";
import { updateMetadata } from "pwa-helpers/metadata";

class BookAbout extends PageViewElement {
    _render() {
        updateMetadata({
            title: "About - News & Books",
            description: "About page"
        });

        return html`
      <style>
        :host {
          padding: 16px;
          text-align: center;
          line-height: 1.5;
        }
        ul{
          list-style-type: none;
        }
      </style>
      <h1>What is this?</h1>
      <p>This is a Progressive Web App(PWA)</p>


      <h1>What it does?</h1>
      <p>The PWA use case are:
        <ul>
          <li>Allow users to browse for news and books</li>
          <li>Check the found news and books details</li>
          <li>If the user is logged will be able to link favorites books with his account</li>
          <li>If the user browser support the speech capability the user will be able to use it instead of type the query</li>
        </ul>
      </p>

      <h1>How I made it?</h1>
      <p>To made this possible I am using the Google Books Api, the New York Time Api and the Unsplash Api services.</p>

      <h1>Where is the source code?</h1>
      <p><a href="https://github.com/rproenza86/news-books-browser" target="_blank" rel="noopener">Check the source code and other technical details on GitHub</a></p>
    `;
    }
}

window.customElements.define("book-about", BookAbout);
