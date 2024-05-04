import {body} from 'express-validator';


export const createValidation = [
    body("id", "id of Property is required number field.").isInt().exists(),
    body("categoryId", "Category is required string field.").isInt().exists(),
]

export const updateValidation = [
    body("id", "id must be number field.").optional().isInt(),
    body("categoryId", "Value must be string field.").optional().isInt(),
]