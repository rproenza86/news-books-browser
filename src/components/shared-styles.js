import { html } from "@polymer/lit-element";

export const BookButtonStyle = html`
<style>
  .book-button {
    display: inline-block;
    margin-right: 8px;
    padding: 8px 44px;
    border: 2px solid var(--app-dark-text-color);
    box-sizing: border-box;
    background-color: transparent;
    color: var(--app-dark-text-color);
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
  }

  .book-button:active {
    background-color: var(--app-dark-text-color);
    color: #FFF;
  }
</style>
`;
