import express from "express";
import { registerUser, loginUser } from "../controllers/Auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerUser);
Authrouter.post("/login", loginUser);

export default Authrouter;