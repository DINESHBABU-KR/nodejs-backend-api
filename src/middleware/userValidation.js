import { body, param, query } from "express-validator";

export const createUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 80 })
    .withMessage("Name cannot exceed 80 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];

export const updateUserValidation = [
  param("id").isMongoId().withMessage("Invalid user ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 80 })
    .withMessage("Name cannot exceed 80 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false")
];

export const userIdValidation = [
  param("id").isMongoId().withMessage("Invalid user ID")
];

export const paginationValidation = [
  query("page").optional().isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit").optional().isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
];