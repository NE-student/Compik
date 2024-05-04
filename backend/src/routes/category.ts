import { Express } from "express"; 
const {createValidation, updateValidation} =  require('../validators/categoryValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const CategoryController = require('../controllers/CategoryController');

export const category = (app:Express)=>{
    app.get('/categories/:page', CategoryController.getCategories);
    app.get('/category/:id', CategoryController.getCategory);
    app.post('/category', checkAuth, checkAdmin, createValidation, CategoryController.createCategory)
    app.patch('/category/:id', checkAuth, checkAdmin, updateValidation, CategoryController.updateCategory)
    app.delete('/category/:id', checkAuth, checkAdmin, CategoryController.removeCategory)
}