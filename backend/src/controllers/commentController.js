import { postCommentsService, getCommentService } from "../models/commentModule.js";
import handleResponse from "./handleResponse.js";



export const getComment = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const result = await getCommentService(id);
        if(result.rowCount<1){
            return handleResponse(res,400,"Comments not Found");
        }
        handleResponse(res,200,"Get comments",result.rows);
    }catch(error){
        next(error);
    }
}

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