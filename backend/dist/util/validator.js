import { body, validationResult } from "express-validator";
export const signUpValidatory = [
    body("username").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("password should contain 6 characters")
];
export const loginValidatory = [
    //body("username").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("password should contain 6 characters")
];
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
        }
        const error = validationResult(req);
        if (error.isEmpty()) {
            return next();
        }
        res.status(422).json({ error: error });
    };
};
//# sourceMappingURL=validator.js.map