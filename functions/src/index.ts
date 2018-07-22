import * as functions from 'firebase-functions';
import * as prplServer from 'prpl-server';
import * as express from 'express';

const app = express();

app.get('/api/launch', (req, res, next) => res.send('boom'));

app.get(
  '*',
  prplServer.makeHandler('./build', {
    builds: [
      { name: 'esm-bundled', browserCapabilities: ['es2015', 'push', 'modules'] },
      { name: 'es6-bundled', browserCapabilities: ['es2015', 'push'] },
      { name: 'es5-bundled' }
    ]
  })
);

export const serve = functions.https.onRequest(app);
