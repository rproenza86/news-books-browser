/* eslint-env node */

module.exports = {
    staticFileGlobs: ["manifest.json", "src/**/*", "images/books-bg.jpg"],
    runtimeCaching: [
        {
            urlPattern: /\/@webcomponents\/webcomponentsjs\//,
            handler: "fastest"
        }
    ]
};
