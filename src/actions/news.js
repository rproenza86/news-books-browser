export const REQUEST_NEWS = "REQUEST_NEWS";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const FAIL_NEWS = "FAIL_NEWS";

const newYorkTimeKey = "f814b038ca6247a2934c4e750c140920";
const unsplashKey =
    "3d27f9afe77a7f5dd3a5ae770548865f1112939878877b29886308c66ce7818b";

function unsplashRequest(searchedForText) {
    return new Promise((resolve, reject) => {
        const url = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
        const headers = { Authorization: `Client-ID ${unsplashKey}` };
        const errorMessage =
            "Response status is not OK with the unsplash images fetch.";
        fetch(url, { headers })
            .then(function(response) {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(errorMessage);
                }
            })
            .catch(() => {
                throw new Error(errorMessage);
            });
    });
}

function articleRequest(searchedForText) {
    return new Promise((resolve, reject) => {
        const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=${newYorkTimeKey}`;
        const errorMessage =
            "Response status is not OK with the NYTimes news fetch.";
        fetch(url)
            .then(function(response) {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    reject(errorMessage);
                }
            })
            .catch(() => {
                throw new Error(errorMessage);
            });
    });
}

export const searchNews = query => (dispatch, getState) => {
    // Check to see if the cached results are from the same query.
    // This is useful for avoiding a network request.
    if (shouldSearchNews(getState(), query)) {
        dispatch(requestNews(query));
        if (getState().app.offline) {
            return dispatch(failNews(query));
        }
        if (query) {
            Promise.all([articleRequest(query), unsplashRequest(query)])
                .then(([articles, images]) => {
                    const articlesList = articles.response.docs;
                    const hdImagesList = images.results;
                    let articlesLength = articlesList.length;
                    let hdImagesLength = hdImagesList.length;

                    while (articlesLength) {
                        if (hdImagesList.length && hdImagesLength === 0) {
                            hdImagesLength = hdImagesList.length;
                        }
                        articlesList[
                            --articlesLength
                        ].imgSrcObject = articlesList[articlesLength].multimedia
                            .length
                            ? {
                                  original: `https://www.nytimes.com/${
                                      articlesList[articlesLength].multimedia[0]
                                          .url
                                  }`
                              }
                            : hdImagesList.length &&
                              hdImagesList[--hdImagesLength].urls;
                    }

                    dispatch(receiveNews(query, articlesList));
                })
                .catch(function(error) {
                    const errorSign = "Error fetching articles or images";
                    console.error(errorSign, error);
                    dispatch(failNews(query));
                });
        } else {
            // query is empty, clear the results
            dispatch(receiveNews(query, []));
        }
    }
};

const shouldSearchNews = (state, query) => {
    return (
        state.news.failure ||
        (state.news.query !== query && !state.news.isFetching)
    );
};

const requestNews = query => {
    return {
        type: REQUEST_NEWS,
        query
    };
};

const receiveNews = (query, items) => {
    return {
        type: RECEIVE_NEWS,
        query,
        items
    };
};

const failNews = query => {
    return {
        type: FAIL_NEWS,
        query
    };
};
