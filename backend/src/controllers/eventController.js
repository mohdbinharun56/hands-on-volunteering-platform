import { createEventService, deleteEventService, getAllEventService, updateEventService } from "../models/eventModel.js";
import handleResponse from "./handleResponse.js";



// get all events
export const getAllEvents = async (req, res, next) => {
    try {
        const events = await getAllEventService();
        handleResponse(res,200,'all events',events)
    } catch (error) {
        next(error)
    }
}

// create Event by admin
export const createEvent = async (req, res, next) => {
    try {
        const newEvent = req.body;
        const event = await createEventService(newEvent);
        handleResponse(res, 200, "Event added", event);
    } catch (error) {
        next(error);
    }
}

// update event
export const updateEvent = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const updateEvent = req.body;
        const result = await updateEventService(id,updateEvent)
        return handleResponse(res,200,"Updated Event",result.rows)
    } catch (error) {
        next(error)
    }
}

// delete event
export const deleteEvent = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const result = await deleteEventService(id);
        handleResponse(res,200,"Delete",result.rows);
    } catch (error) {
        next(error)
    }
}