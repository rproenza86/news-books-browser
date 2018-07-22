import { createSelector } from "reselect";
import { itemsSelector } from "./news.js";
import { REQUEST_ANEWS, RECEIVE_ANEWS, FAIL_ANEWS } from "../actions/aNews.js";

export const aNews = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_ANEWS:
            return {
                ...state,
                id: action.id,
                failure: false,
                isFetching: true
            };
        case RECEIVE_ANEWS:
            return {
                ...state,
                item: action.item,
                failure: false,
                isFetching: false
            };
        case FAIL_ANEWS:
            return {
                ...state,
                failure: true,
                isFetching: false
            };
        default:
            return state;
    }
};

const idSelector = state => state.aNews.id;
const itemSelector = state => state.aNews.item;

export const aNewsSelector = state => state.aNews.item;
