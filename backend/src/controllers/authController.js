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
// export const signInUser = async(req,res,next)=>{
//     try{
//         const userCredentials = req.body;
//         const loginUserToken = await signInUserService(userCredentials);
//         // console.log(loginUserToken);
//         res.cookie("token",loginUserToken.token,{
//             httpOnly: true,
//             secure: false,
//             sameSite: "strict"
//         })
//         handleResponse(res,200,"User logged in successfully",loginUserToken);
//     } catch(error){
//         next(error);
//     }
// }


export const signInUser = async (req, res, next) => {
    try {
        const userCredentials = req.body;
        const loginUserToken = await signInUserService(userCredentials);
        
        console.log("Setting cookie with token:", loginUserToken.token);  // Debugging

        res.cookie("token", loginUserToken.token, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict"
        });

        console.log("Cookies after setting:", req.cookies); // Check if it's set

        handleResponse(res, 200, "User logged in successfully", loginUserToken);
    } catch (error) {
        next(error);
    }
};
