import { postCommentsService } from "../models/commentModule.js";
import handleResponse from "./handleResponse.js";

export const postComment = async(req,res,next)=>{
    try{
        const postComment = req.body;
        const result = await postCommentsService(postComment);
        if(result.rowCount<1){
            return handleResponse(res,400,"Comments not send");
        }
        handleResponse(res,200,"comments sent",result.rows);
    }
    catch(error){
        next(error);
    }
}