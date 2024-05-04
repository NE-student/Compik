import { Express } from "express"; 
const {createValidation, updateValidation} =  require('../validators/propertyValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const PropertyController = require('../controllers/Properties/PropertyController');

export const property = (app:Express)=>{
    app.get('/properties/:page', PropertyController.getProperties);
    app.get('/property/:id', PropertyController.getProperty);
    app.post('/property', checkAuth, checkAdmin, createValidation, PropertyController.createProperty)
    app.delete('/property/:id', checkAuth, checkAdmin, PropertyController.removeProperty)
    app.patch('/property/:id', checkAuth, checkAdmin, updateValidation, PropertyController.updateProperty)
}