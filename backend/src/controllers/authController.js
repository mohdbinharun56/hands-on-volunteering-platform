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

// signin user
export const signInUser = async(req,res,next)=>{
    try{
        const userCredentials = req.body;
        const loginUser = await signInUserService(userCredentials);
        handleResponse(res,200,"User logged in successfully",loginUser);
    } catch(error){
        next(error);
    }
}
