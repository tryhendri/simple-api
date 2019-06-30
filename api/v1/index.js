"use strict";

const UserController = require("./user/users.controller");
const AuthController = require("./auth/auth.controller");
const express = require("express");
const router = express.Router();

// User API
router.post("/user", UserController.add);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.getById);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove);
router.post("/user/keyname", UserController.findByKeyName);
// Admin authentication
router.post("/auth/authenticate", AuthController.authenticate);
router.post("/auth/register", AuthController.register);

module.exports = router;
