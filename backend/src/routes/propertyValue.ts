import { Express, Request, Response } from "express"; 
const {createValidation, updateValidation} =  require('../validators/propertyValueValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const PropertyValueController = require('../controllers/Properties/PropertyValueController');

export const propertyValue = (app:Express)=>{
    app.post('/property/values/:page', checkAuth, checkAdmin, PropertyValueController.getPropertyValues);
    app.get('/property/value/:id', checkAuth, checkAdmin, PropertyValueController.getPropertyValue);
    app.post('/property/value', checkAuth, checkAdmin, createValidation, PropertyValueController.createPropertyValue)
    app.delete('/property/value/:id', checkAuth, checkAdmin, PropertyValueController.removePropertyValue)
    app.patch('/property/value/:id', checkAuth, checkAdmin, updateValidation, PropertyValueController.updatePropertyValue)
}