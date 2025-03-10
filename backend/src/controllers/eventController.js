import { createEventService, getAllEventService } from "../models/eventModel.js";
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
