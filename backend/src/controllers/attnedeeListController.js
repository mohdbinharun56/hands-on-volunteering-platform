import { attendeeListService } from "../models/attendeeListModel.js";
import handleResponse from "./handleResponse.js";


export const attendeeList = async(req,res,next)=>{
    try{
        const list = req.body;
        console.log("from controller:",list);
        if(!list.user_id || !list.event_id){
            return handleResponse(res,400,"User ID and Event ID is required");
        }
        console.log("Attendees List is: ",list)
        const result = await attendeeListService(res,list);
        handleResponse(res,200,"Register Events",result);
    }catch(error){
        next(error)
    }
}