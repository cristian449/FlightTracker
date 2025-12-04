import { db } from "./dbConfig.js";
const { Flights, Users } = db;


export const flightService = {
    getFlight: async (flightId) => {
        const flight = await db.Flights.findOne({
            where: { id: flightId },
            include: {
        model: db.Users,
        as: "Customers"                 
        }
    });
        return flight ? flight.get({ plain: true }) : undefined;
    },

    getFlights: async () => {
        const flights = await Flights.findAll({
            attributes: ["id", "name" ],
            attributes: ['id', 'name', 'from', 'to', 'length', 'departureTime'],
        });
        return flights.map((f) => f.get({ plain: true }));
    },

    createFlight: async (name, from, to, length) => {
        return await Flights.create({
            name,
            from,
            to,
            length,
            departureTime: new Date()
        });
    },


    updateFlight: async (flightId, data) => {
        const [updatedCount] = await Flights.update(data, { where: { id: flightId } });
        if (updatedCount > 0) {
            return await Flights.findByPk(flightId);
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
