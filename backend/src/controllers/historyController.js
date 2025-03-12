import { getHistoryService } from "../models/historyModule.js";
import handleResponse from "./handleResponse.js";

export const getHistory = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const result = await getHistoryService(res,id);
        if(!result){
            return handleResponse(res,400,"User Not Found");
        }
        
        handleResponse(res,200,"Get History of users",result);
    }catch(error){
        next(error)
    }
}