import { Express, Request, Response } from "express"; 
const {registerValidation, loginValidation} =  require('../validators/authValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index.ts');
const ComponentPropertyController = require('../controllers/Properties/ComponentPropertyController');
const ComponentController = require('../controllers/ComponentController');

export const component = (app:Express)=>{

    app.post('/component/properties', checkAuth, checkAdmin, ComponentPropertyController.getPropertiesByCategory)
    app.post('/component', checkAuth, checkAdmin, ComponentController.createComponent)
    app.post('/components/:page', checkAuth, checkAdmin, ComponentController.getComponents)
    app.get('/component/:id', checkAuth, checkAdmin, ComponentController.getComponent)
    app.patch('/component/:id', checkAuth, checkAdmin, ComponentController.updateComponent)
    app.delete('/component/:id', checkAuth, checkAdmin, ComponentController.removeComponent)
        

}