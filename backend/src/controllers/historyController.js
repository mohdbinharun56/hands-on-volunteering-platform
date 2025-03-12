import { deleteHistoryService, getHistoryService } from "../models/historyModule.js";
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

export const deleteHistory = async(req,res,next)=>{
    try {
        const userId = req.params.userid;
        const eventId = req.params.eventid;
        const result = await deleteHistoryService(res,userId,eventId);
        // console.log(result);
        if(result.rowCount<1){
            return handleResponse(res,400,"Does not delete item");
        }
        handleResponse(res,200,"Delete Register Events",result.rows)
    } catch (error) {
        next(error)
    }
}