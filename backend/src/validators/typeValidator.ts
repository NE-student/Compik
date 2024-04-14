import {body} from 'express-validator';


export const createValidation = [
    body("Name", "Name is required string field.").isString().exists()
]

export const updateValidation = [
    body("Name", "Name must be string field.").optional().isString()
]