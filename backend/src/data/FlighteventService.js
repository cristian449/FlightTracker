import { db } from "./dbConfig.js";

export const flightEventService = {
    logEvent: async (FlightId, type, message = null) => {
        return await db.FlightEvents.create({
            FlightId,
            type,
            message
        });
    },

    getEventsForFlight: async (FlightId) => {
        return await db.FlightEvents.findAll({
            where: { FlightId },
            order: [["timestamp", "DESC"]],
            attributes: { exclude: ["updatedAt"] }
        });
    }


};
