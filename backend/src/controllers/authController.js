// sign-up / create user

import { createUserService } from "../models/authModel.js";
import handleResponse from "./handleResponse.js";

export const createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await createUserService(newUser);
        handleResponse(res, 201, "User register successfully", result)
    } catch (error) {
        next(error);
    }

}