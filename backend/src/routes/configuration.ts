import { Express } from "express"; 
const {createValidation, updateValidation} =  require('../validators/categoryValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const ConfigurationController = require('../controllers/ConfigurationController');

export const configuration = (app:Express)=>{
    app.get('/configurations/:page', ConfigurationController.getConfigurations);
    app.get('/configuration/:id', ConfigurationController.getConfiguration);
    app.post('/configuration', checkAuth, createValidation, ConfigurationController.createConfiguration)
    app.patch('/configuration/:id', checkAuth, updateValidation, ConfigurationController.updateConfiguration)
    app.delete('/configuration/:id', checkAuth, ConfigurationController.removeConfiguration)
}