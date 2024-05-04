import { Express, Request, Response } from "express"; 
const {createValidation, updateValidation} =  require('../validators/propertyValueValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const ComparePropertyValueController = require('../controllers/Properties/CompareProperties/ComparePropertyValueController');

export const comparePropertyValue = (app:Express)=>{
    app.post('/compare/property/values/:page', checkAuth, checkAdmin, ComparePropertyValueController.getPropertyValues);
    app.get('/compare/property/value/:id', checkAuth, checkAdmin, ComparePropertyValueController.getPropertyValue);
    app.post('/compare/property/value', checkAuth, checkAdmin, createValidation, ComparePropertyValueController.createPropertyValue)
    app.delete('/compare/property/value/:id', checkAuth, checkAdmin, ComparePropertyValueController.removePropertyValue)
    app.patch('/compare/property/value/:id', checkAuth, checkAdmin, updateValidation, ComparePropertyValueController.updatePropertyValue)
}