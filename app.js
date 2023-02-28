import 'dotenv/config.js';

import logger from 'morgan';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { WebAppAuthClientBuilder } from 'microsoft-identity-express';

import models from './models.js';
import apiv1 from './routes/api/v1/api.js';

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

const appSettings = {
    appCredentials: {
        clientId: process.env.CLIENT_ID,
        tenantId: process.env.TENAT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    authRoutes: {
        redirect: 'http://localhost:3001/redirect',
        error: '/error',
        unauthorized: '/unauthorized'
    }
};
const authClient = new WebAppAuthClientBuilder(appSettings).build();
app.use(authClient.initialize());

app.use((req, res, next) => {
    req['models'] = models;
    next();
});
app.use('/api/v1', apiv1);

app.get('/login',
    authClient.signIn({ postLoginRedirect: '/' })
);

app.get('/logout',
    authClient.signOut({ postLogoutRedirect: '/' })
);

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error");
});

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

export default app;