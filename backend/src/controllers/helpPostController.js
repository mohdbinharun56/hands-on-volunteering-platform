import { getPostByIDService, getPostService, helpPostService } from "../models/helpPostModule.js";
import handleResponse from "./handleResponse.js";


export const getPost = async(req,res,next)=>{
    try{
        const result = await getPostService();
        if(!result){
            return handleResponse(res,400,"Does not get posts");
        }
        handleResponse(res,200,"Fetch Help Posts",result);
    }catch(error){
        next(error);
    }
}

export const getPostByID = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const result = await getPostByIDService(id);
        console.log(result)
        if(!result){
            throw new Error("Not Found this ID posts")
        }
        handleResponse(res,200,"Find the post",result);
    } catch (error) {
        next(error)
    }
}
export const helpPost = async(req,res,next)=>{
    try {
        const newPost = req.body;
        const result = await helpPostService(newPost);
        console.log(result);
        handleResponse(res,200,"Help post added.",result);
    } catch (error) {
        next(error);
    }
}