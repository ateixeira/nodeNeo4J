import express from 'express';
import compression from 'compression';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';
import { Neo4j } from './db';

// Controllers (route handlers)
import * as homeController from './controllers/home';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3009);
app.engine(
  '.hbs',
  handlebars({
    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views')
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../views'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: '3c54v67b788yj9u09m8ny7bt6vr56ce45xc'
  })
);

app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/*
 * Routes
 */
app.get('/', homeController.index);

export default app;