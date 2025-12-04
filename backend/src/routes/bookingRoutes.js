import BookingsController from "../controllers/BookingsController.js";

export default (app) => {


    app.post("/api/v1/bookings", BookingsController.create);

    app.get("/api/v1/users/:username/bookings", BookingsController.getUserBookings);
};
