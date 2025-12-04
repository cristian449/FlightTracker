import { db } from "../data/dbConfig.js";

const create = async (req, res) => {
    const { flightId, username } = req.body;

    if (!flightId || !username) {
        return res.status(400).json({ error: "Missing flightId or username" });
    }

    try {
        const booking = await db.Bookings.create({
            FlightId: flightId,
            UserUsername: username,
            bookingdate: new Date()
        });

        return res.status(201).json(booking);
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUserBookings = async (req, res) => {
    const { username } = req.params;

    try {
        const bookings = await db.Bookings.findAll({
            where: { UserUsername: username },
            include: [{ model: db.Flights }]  
        });

        return res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSelectList = async (req, res) => {
    try {
        const flights = await db.Flights.findAll({
            attributes: ["id", "name", "from", "to"]
        });

        const list = flights.map(f => ({
            id: f.id,
            label: `${f.name} (${f.from} → ${f.to})`
        }));

        return res.json(list);
    } catch (err) {
        console.error("Error fetching select list:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await db.Bookings.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ error: "Booking not found" });
        }

        return res.status(204).send(); // success, no content
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export default {
    create,
    getUserBookings,
    getSelectList,
    deleteBooking
};
