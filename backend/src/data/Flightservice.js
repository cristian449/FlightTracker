import { db } from "./dbConfig.js";
const { Flights, Users } = db;


export const flightService = {
    getFlight: async (flightId) => {
        const flight = await db.Flights.findOne({
            where: { id: flightId },
            include: {
        model: db.Users,
        through: { attributes: [] }, 
        as: "Customers"                 
        }
    });
        return flight ? flight.get({ plain: true }) : undefined;
    },

    getFlights: async () => {
        const flights = await Flights.findAll({
            attributes: ["id", "name", "from", "to", "length"],
        });
        return flights.map((f) => f.get({ plain: true }));
    },

    createFlight: async (name, from, to, length) => {
        const createdFlight = await Flights.create({ name, from, to, length });
        return createdFlight.get({ plain: true });
    },

    updateGame: async (flightId, flight) => {
        const [updatedCount, _ ] = await Flights.update(flight, {where: {id: flightId}});
        if (updatedCount > 0) {
            return await Games.findByPk(flightId);
        }
        return null;
    },

    deleteFlight: async (flightId) => {
        const deleteResult = await Flights.destroy({
            where: { id: flightId },
        });
        return deleteResult !== 0;
    },
};
