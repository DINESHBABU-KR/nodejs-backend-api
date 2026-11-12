import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userManagementController.js";

import {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
  paginationValidation
} from "../middleware/userValidation.js";

import cacheMiddleware from "../middleware/cacheMiddleware.js";
import redis from "../config/redis.js";

const router = express.Router();

// All routes require admin authentication
router.use(authMiddleware, authorizeRoles("admin"));

router.post(
  "/users",
  createUserValidation,
  validateRequest,
  createUser
);

router.get(
  "/users",
  paginationValidation,
  validateRequest,
  cacheMiddleware(60),
  getAllUsers
);

router.get(
  "/users/:id",
  userIdValidation,
  validateRequest,
  getUserById
);

router.put(
  "/users/:id",
  updateUserValidation,
  validateRequest,
  updateUser
);

router.delete(
  "/users/:id",
  userIdValidation,
  validateRequest,
  deleteUser
);

export default router;