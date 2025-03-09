import { createUserService, signInUserService } from "../models/authModel.js";
import handleResponse from "./handleResponse.js";

// create user / sign-up user
export const createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const result = await createUserService(newUser);
        handleResponse(res, 201, "User register successfully", result)
    } catch (error) {
        next(error);
    }

}


export const signInUser = async (req, res, next) => {
    try {
        const userCredentials = req.body;
        const loginUserToken = await signInUserService(userCredentials);

        res.cookie("token", loginUserToken.token, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict"
        });
        
        handleResponse(res, 200, "User logged in successfully", loginUserToken);
    } catch (error) {
        next(error);
    }
};
