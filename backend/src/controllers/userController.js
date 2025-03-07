import { getAllUserService } from "../models/userModel.js";

const handleResponse = (res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
}

export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await getAllUserService();
        handleResponse(res,200,"users data",users);
    }catch(error){
        next(error)
    }
}