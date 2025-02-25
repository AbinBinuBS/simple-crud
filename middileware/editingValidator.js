import { body, validationResult } from "express-validator";

export const validateUpdateUser = [
    body("name").optional().isString().withMessage("Name must be a string"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("age")
        .optional()
        .toInt()
        .isInt({ min: 0 })
        .withMessage("Age must be a positive number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
