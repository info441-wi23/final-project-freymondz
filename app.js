import 'dotenv/config.js';

import logger from 'morgan';
import express from 'express';

import models from './models.js';
import apiv1 from './routes/api/v1/api.js';

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {
    req['models'] = models;
    next();
});
app.use('/api/v1', apiv1);

app.listen(3001, "127.0.0.1", () => {
    console.log('Server is running on http://127.0.0.1:3001/');
});

export default app;