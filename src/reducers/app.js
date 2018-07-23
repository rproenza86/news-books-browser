import {
    UPDATE_PAGE,
    RECEIVE_LAZY_RESOURCES,
    UPDATE_SUBTITLE,
    UPDATE_OFFLINE,
    UPDATE_WIDE_LAYOUT,
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
    UPDATE_DRAWER_STATE
} from "../actions/app.js";

const app = (state = { drawerOpened: false }, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            const p = action.page;
            return {
                ...state,
                page: p,
                lastVisitedListPage:
                    p === "explore" || p === "favorites" || p === "news"
                        ? p
                        : state.lastVisitedListPage
            };
        case RECEIVE_LAZY_RESOURCES:
            return {
                ...state,
                lazyResourcesLoaded: true
            };
        case UPDATE_SUBTITLE:
            return {
                ...state,
                subTitle: action.subTitle
            };
        case UPDATE_OFFLINE:
            return {
                ...state,
                offline: action.offline
            };
        case UPDATE_WIDE_LAYOUT:
            return {
                ...state,
                wideLayout: action.wide
            };
        case UPDATE_DRAWER_STATE:
            return {
                ...state,
                drawerOpened: action.opened
            };
        case OPEN_SNACKBAR:
            return {
                ...state,
                snackbarOpened: true
            };
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbarOpened: false
            };
        default:
            return state;
    }
};

export default app;
