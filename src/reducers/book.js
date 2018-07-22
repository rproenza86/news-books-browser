import { createSelector } from "reselect";
import { itemsSelector } from "./books.js";
import { favoritesSelector } from "./favorites.js";
import { REQUEST_BOOK, RECEIVE_BOOK, FAIL_BOOK } from "../actions/book.js";

export const book = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_BOOK:
            return {
                ...state,
                id: action.id,
                failure: false,
                isFetching: true
            };
        case RECEIVE_BOOK:
            return {
                ...state,
                item: action.item,
                failure: false,
                isFetching: false
            };
        case FAIL_BOOK:
            return {
                ...state,
                failure: true,
                isFetching: false
            };
        default:
            return state;
    }
};

const idSelector = state => state.book.id;
const itemSelector = state => state.book.item;

export const bookSelector = createSelector(
    idSelector,
    itemsSelector,
    favoritesSelector,
    itemSelector,
    (id, items, favorites, item) => {
        return (items && items[id]) || (favorites && favorites[id]) || item;
    }
);
