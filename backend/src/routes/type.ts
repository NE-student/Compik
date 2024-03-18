import { Express, Request, Response } from "express"; 
const {createValidation, updateValidation} =  require('../validators/type');
const {checkAuth, checkAdmin} = require('../middlewares/index.ts');
const TypeController = require('../controllers/TypeController');

export const type = (app:Express)=>{
    app.get('/types/:page', checkAuth, checkAdmin, TypeController.getTypes);
    app.get('/type/:id', checkAuth, checkAdmin, TypeController.getType);
    app.post('/type', checkAuth, checkAdmin, createValidation, TypeController.createType)
    app.delete('/type/:id', checkAuth, checkAdmin, TypeController.removeType)
    app.patch('/type/:id', checkAuth, checkAdmin, updateValidation, TypeController.updateType)
}