import Flights from "./Flightmodel.js";

export const flightService = {
    getFlight: async (flightId) => {
        const flight = await Flights.findByPk(flightId, {
            attributes: {exclude: ['createdAt', 'updatedAt']},
        });
        return flight ? flight.get({ plain: true }) : undefined;
    },
    getFlights: async () => {
        const flights = await Flights.findAll({
            attributes: ['id', 'name'],
        });
        return flights.map(f => f.get({ plain: true }));
    },
    createFlight: async (name, from, to, length) => {
        const createdFlight = await Flights.create({
            name,
            from,
            to,
            length
        });
        return createdFlight.get({ plain: true });
    },
      deleteFlight: async (flightId) => {
        const deleteResult = await Flights.destroy({
            where: { id: flightId },
        });
        return deleteResult !== 0; 
    },

};
