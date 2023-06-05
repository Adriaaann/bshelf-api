const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const BooksController = require('./controllers/BooksController');
const PlanningController = require('./controllers/PlanningController');
const FavoritesController = require('./controllers/FavoritesController');

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.read);
routes.post('/users/:id', UsersController.update);
routes.get('/users/:id', UsersController.readOne);
routes.delete('/users/:id', UsersController.delete);

routes.post('/login', UsersController.login);

routes.get('/favorites/:id', FavoritesController.read);

routes.get('/planning/:id', PlanningController.read);

routes.get('/books/:id', BooksController.read);
routes.get('/books/:id/:bookId', BooksController.readOne);
routes.post('/books/:id', BooksController.add);
routes.delete('/books/:id/:bookId', BooksController.delete);

module.exports = routes;