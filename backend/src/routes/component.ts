import { Express, Request, Response } from "express"; 
const {registerValidation, loginValidation} =  require('../validators/authValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const ComponentController = require('../controllers/ComponentController');
const ComponentPropertyController = require('../controllers/Properties/ComponentPropertyController');
const ComponentComparePropertyController = require('../controllers/Properties/CompareProperties/ComponentComparePropertyController');
const PropertyController = require('../controllers/Properties/PropertyController');
const ComparePropertyController = require('../controllers/Properties/CompareProperties/ComparePropertyController');

export const component = (app:Express)=>{

    app.get('/component/properties/:category', PropertyController.getPropertiesByCategory)
    app.post('/component/property', checkAuth, checkAdmin, ComponentPropertyController.createComponentProperty)

    app.post('/componentsByFilters/', ComponentController.getComponentsByFilter)
    app.post('/countByComponents/', ComponentController.getCountByComponents)
    
    app.get('/component/compare/properties/:category', ComparePropertyController.getComparePropertiesByCategory)
    app.post('/component/compare/property', checkAuth, checkAdmin, ComponentComparePropertyController.createComponentProperty)

    app.post('/component', checkAuth, checkAdmin, ComponentController.createComponent)
    app.post('/components/:page', ComponentController.getComponents)
    app.get('/component/:id', ComponentController.getComponent)
    app.patch('/component/:id', checkAuth, checkAdmin, ComponentController.updateComponent)
    app.delete('/component/:id', checkAuth, checkAdmin, ComponentController.removeComponent)
    

}