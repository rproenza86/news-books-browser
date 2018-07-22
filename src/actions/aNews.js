export const REQUEST_ANEWS = "REQUEST_ANEWS";
export const RECEIVE_ANEWS = "RECEIVE_ANEWS";
export const FAIL_ANEWS = "FAIL_ANEWS";

export const getANews = id => (dispatch, getState) => {
    dispatch(requestANews(id));
    const state = getState();
    const aNews = state.news && state.news.items && state.news.items[id];
    if (aNews) {
        // book found in state.news.items or state.favorites.items
        dispatch(receiveANews(id, aNews));
        // let the calling code know there's nothing to wait for.
        return Promise.resolve();
    } else {
        // Possible options: get from cache or return to the news explorer page or dispatch failure
    }
};

const requestANews = id => {
    return {
        type: REQUEST_ANEWS,
        id
    };
};

const receiveANews = (id, item) => {
    return {
        type: RECEIVE_ANEWS,
        id,
        item
    };
};

const failANews = id => {
    return {
        type: FAIL_ANEWS,
        id
    };
};
