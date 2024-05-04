import { Express, Request, Response } from "express"; 
const {registerValidation, loginValidation} =  require('../validators/authValidator');
const {checkAuth, checkAdmin} = require('../middlewares/index');
const UserController = require('../controllers/UserController.ts');

export const auth = (app:Express)=>{
    app.get('/auth/users/:page', UserController.getUsers);
    app.post('/auth/login', loginValidation, UserController.login)
    app.post('/auth/register', registerValidation, UserController.register)
    app.get('/auth/emailVerify', UserController.verifyEmail)
    app.get('/auth/me', checkAuth, UserController.getMe)
}