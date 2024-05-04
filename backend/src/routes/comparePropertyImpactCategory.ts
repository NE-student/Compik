import { Express, Request, Response } from "express"; 
const {createValidation, updateValidation} =  require('../validators/propertyCategoryImpactValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const ComparePropertyImpactCategoryController = require('../controllers/Properties/CompareProperties/ComparePropertyImpactCategoryController');

export const comparePropertyImpactCategory = (app:Express)=>{
    app.post('/compare/property/impactCategories/:page', checkAuth, checkAdmin, ComparePropertyImpactCategoryController.getPropertyImpactCategories);
    app.get('/compare/property/impactCategory/:id', checkAuth, checkAdmin, ComparePropertyImpactCategoryController.getPropertyImpactCategory);
    app.post('/compare/property/impactCategory', checkAuth, checkAdmin, createValidation, ComparePropertyImpactCategoryController.createPropertyImpactCategory)
    app.patch('/compare/property/impactCategory/:id', checkAuth, checkAdmin, updateValidation, ComparePropertyImpactCategoryController.updatePropertyImpactCategory)
    app.delete('/compare/property/impactCategory/:id', checkAuth, checkAdmin, ComparePropertyImpactCategoryController.removePropertyImpactCategory)
}