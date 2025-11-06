import { db } from "./dbConfig.js";

export const flightService = {
    getFlight: async (flightId) => {
        const flight = await db.Flights.findByPk(flightId, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return flight ? flight.get({ plain: true }) : undefined;
    },

    getFlights: async () => {
        const flights = await db.Flights.findAll({
            attributes: ["id", "name"],
        });
        return flights.map((f) => f.get({ plain: true }));
    },

    createFlight: async (name, from, to, length) => {
        const createdFlight = await db.Flights.create({ name, from, to, length });
        return createdFlight.get({ plain: true });
    },

    deleteFlight: async (flightId) => {
        const deleteResult = await db.Flights.destroy({
            where: { id: flightId },
        });
        return deleteResult !== 0;
    },
};
