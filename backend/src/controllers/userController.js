import { getAllUserService, getUserService, updateUserService } from "../models/userModel.js";
import handleResponse from "./handleResponse.js";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUserService();
        handleResponse(res, 200, "users data fetch", users);
    } catch (error) {
        next(error);
    }
}


// get user while jwt token is exists.
export const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await getUserService(id);

        if (user.length === 0) {
            return res.status(401).json({
                message: "User not found!"
            })
        }
        // console.log("user is getting: ",user[0]);
        const { password_hash, ...restUser } = user[0];
        // console.log("Rest of the user is: ", restUser)
        handleResponse(res, 201, "User Profile", restUser)
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateProfile = req.body;

        const result = await updateUserService(id, updateProfile);
        console.log("From controller users ", result.rows);
        handleResponse(res, 200, "Profile Updated", result.rows)
    } catch (error) {
        next(error);
    }
}