import Flights from "./Flightmodel.js";

export const flightService = {
    getFlight: async (flightId) => {
        const flight = await Flights.findByPk(flightId);
        return flight ? flight.get({ plain: true }) : undefined;
    },
    getFlights: async () => {
        const flights = await Flights.findAll({
            attributes: ['id', 'name'],
        });
        return flights.map(f => f.get({ plain: true }));
    }
};
