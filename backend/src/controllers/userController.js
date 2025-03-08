import { getAllUserService } from "../models/userModel.js";
import handleResponse from "./handleResponse.js";


export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await getAllUserService();
        handleResponse(res,200,"users data fetch",users);
    }catch(error){
        next(error)
    }
}