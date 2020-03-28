const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * ROTA DE LOGIN
 */
routes.post('/sessions', SessionController.create);
/** */

/**
 * ROTAS ONGS
 */
// Listar todas as ONGs
routes.get('/ongs', OngController.index);

// Cadastrar uma nova ONG
routes.post('/ongs', OngController.create);
/** */

/**
 * ROTAS INCIDENTES ESPECÍFICOS
 */
// Listar incidentes específicos por ONG
routes.get('/profile', ProfileController.index);
/** */

/**
 * ROTAS INCIDENTES GERAIS
 */
// Listar todos os incidentes
routes.get('/incidents', IncidentController.index);

// Cadastrar um novo incidente
routes.post('/incidents', IncidentController.create);

// Deletar um incidente
routes.delete('/incidents/:id', IncidentController.delete);
/** */

module.exports = routes;

