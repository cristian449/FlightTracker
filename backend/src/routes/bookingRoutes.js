import BookingsController from "../controllers/BookingsController.js";

export default (app) => {

    app.get("/api/v1/bookings", async (req, res) => {
    const all = await db.Bookings.findAll();
    return res.json(all);
    });

    app.delete("/api/v1/bookings/:id", BookingsController.deleteBooking);


    app.post("/api/v1/bookings", BookingsController.create);

    app.get("/api/v1/users/:username/bookings", BookingsController.getUserBookings);
};
