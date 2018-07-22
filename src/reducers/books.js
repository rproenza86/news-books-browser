import { createSelector } from "reselect";
import { REQUEST_BOOKS, RECEIVE_BOOKS, FAIL_BOOKS } from "../actions/books.js";

export const books = (state = { query: null }, action) => {
    switch (action.type) {
        case REQUEST_BOOKS:
            return {
                ...state,
                query: action.query,
                items: null, // reset items
                failure: false,
                isFetching: true
            };
        case RECEIVE_BOOKS:
            return {
                ...state,
                items: action.items.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {}),
                failure: false,
                isFetching: false
            };
        case FAIL_BOOKS:
            return {
                ...state,
                items: null,
                failure: true,
                isFetching: false
            };
        default:
            return state;
    }
};

export const itemsSelector = state => state.books && state.books.items;

export const itemListSelector = createSelector(itemsSelector, items => {
    return items
        ? Object.keys(items).map(key => items[key])
        : [{}, {}, {}, {}, {}];
});
