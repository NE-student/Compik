import {body} from 'express-validator';


export const createValidation = [
    body("id", "id of Property is required number field.").isInt().exists(),
    body("value", "Value is required string field.").isString().exists(),
]

export const updateValidation = [
    body("id", "id must be number field.").optional().isInt(),
    body("value", "Value must be string field.").optional().isString(),
]