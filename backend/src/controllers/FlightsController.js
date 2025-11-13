import { flightService } from "../data/Flightservice.js";

const getById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }

    const flight = await flightService.getFlight(id);
    if (!flight) {
        return res.status(404).send({ error: "Flight not found" });
    }

    return res.json(flight);
};

const getAll = async (req, res) => {
    try {
        const flights = await flightService.getFlights();
        return res.json(flights);
    } catch (error) {
        console.error("Error fetching flights:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const create = async (req, res) => {
    const { name, from, to, length } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).send({ error: "Missing or empty required field: name" });
    }

    try {
        const createdFlight = await flightService.createFlight(name, from, to, length);
        return res.status(201).json(createdFlight);
    } catch (error) {
        console.error("Error creating flight:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }

    try {
        const flightDeleted = await flightService.deleteFlight(id);
        if (!flightDeleted) {
            return res.status(404).send({ error: "Flight not found" });
        }
        return res.status(204).send(); 
    } catch (error) {
        console.error("Error deleting flight:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};


const update = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }

    const { name, from, to, length } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).send({ error: "Missing or empty required field: name" });
    }

    try {
        const updatedFlight = await flightService.updateFlight(id, { name, from, to, length });

        if (!updatedFlight) {
            return res.status(404).send({ error: "Flight not found" });
        }

        return res.json(updatedFlight);
    } catch (error) {
        console.error("Error updating flight:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};


export default {
    getById,
    getAll,
    create,
    remove,
    update
};
