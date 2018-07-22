"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const prplServer = require("prpl-server");
const express = require("express");
const app = express();
app.get('/api/launch', (req, res, next) => res.send('boom'));
app.get('*', prplServer.makeHandler('./build', {
    builds: [
        { name: 'esm-bundled', browserCapabilities: ['es2015', 'push', 'modules'] },
        { name: 'es6-bundled', browserCapabilities: ['es2015', 'push'] },
        { name: 'es5-bundled' }
    ]
}));
exports.serve = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map