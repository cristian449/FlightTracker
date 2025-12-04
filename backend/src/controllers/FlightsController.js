import { flightService } from "../data/Flightservice.js";
import { flightEventService } from "../data/FlighteventService.js";

const getById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ error: "ID missing" });

    const flight = await flightService.getFlight(id);
    if (!flight) return res.status(404).send({ error: "Flight not found" });

    return res.json(flight);
};

const getAll = async (req, res) => {
    try {
        const flights = await flightService.getFlights();
        return res.json(flights);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const create = async (req, res) => {
    const { name, from, to, length } = req.body;

    if (!name) return res.status(400).send({ error: "Missing required field: name" });

    try {
        const createdFlight = await flightService.createFlight(name, from, to, length);

        await flightEventService.logEvent(createdFlight.id, "CREATED", "Flight was created");

        return res.status(201).json(createdFlight);

    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send({ error: "ID missing" });

    try {
        const deleted = await flightService.deleteFlight(id);

        if (!deleted) return res.status(404).send({ error: "Flight not found" });

        await flightEventService.logEvent(id, "DELETED", "Flight deleted");

        return res.status(204).send();

    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await flightService.updateFlight(id, req.body);

        if (!updated) return res.status(404).send({ error: "Flight not found" });

        await flightEventService.logEvent(id, "UPDATED", "Flight updated");

        return res.json(updated);

    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await flightEventService.getEventsForFlight(req.params.id);
        return res.json(events);
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const getSelectList = async (req, res) => {
    try {
        const flights = await flightService.getFlights();
        return res.json(
            flights.map(f => ({
                id: f.id,
                name: `${f.from} → ${f.to}`
            }))
        );
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

export default {
    getById,
    getAll,
    create,
    remove,
    updateById,
    getEvents,
    getSelectList
};
