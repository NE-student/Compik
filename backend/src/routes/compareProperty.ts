import { Express } from "express"; 
const {createValidation, updateValidation} =  require('../validators/propertyValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const ComparePropertyController = require('../controllers/Properties/CompareProperties/ComparePropertyController');

export const compareProperty = (app:Express)=>{
    app.get('/compare/properties/:page', ComparePropertyController.getCompareProperties);
    app.get('/compare/property/:id', ComparePropertyController.getCompareProperty);
    app.post('/compare/property', checkAuth, checkAdmin, createValidation, ComparePropertyController.createCompareProperty)
    app.delete('/compare/property/:id', checkAuth, checkAdmin, ComparePropertyController.removeCompareProperty)
    app.patch('/compare/property/:id', checkAuth, checkAdmin, updateValidation, ComparePropertyController.updateCompareProperty)
}