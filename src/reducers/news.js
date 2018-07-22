import { createSelector } from "reselect";
import { REQUEST_NEWS, RECEIVE_NEWS, FAIL_NEWS } from "../actions/news.js";

export const news = (state = { query: null }, action) => {
    switch (action.type) {
        case REQUEST_NEWS:
            return {
                ...state,
                query: action.query,
                items: null, // reset items
                failure: false,
                isFetching: true
            };
        case RECEIVE_NEWS:
            return {
                ...state,
                items: action.items.reduce((obj, item) => {
                    item.id = item._id;
                    obj[item.id] = item;
                    return obj;
                }, {}),
                failure: false,
                isFetching: false
            };
        case FAIL_NEWS:
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

export const itemsSelector = state => state.news && state.news.items;

export const itemListSelector = createSelector(itemsSelector, items => {
    return items
        ? Object.keys(items).map(key => items[key])
        : [{}, {}, {}, {}, {}];
});
