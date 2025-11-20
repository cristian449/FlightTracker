import FlightsController from "../controllers/FlightsController.js";

export default (app) => {
    app.route('/api/v1/flights')
        .get(FlightsController.getAll)
        .post(FlightsController.create);
    app.route('/api/v1/flights/:id')
        .get(FlightsController.getById)
        .delete(FlightsController.remove)
        .put(FlightsController.updateById);

    //FlightEvents as i dont want to create a separate route file for them
    //Same with the controller
    app.route('/api/v1/flights/:id/events')
        .get(FlightsController.getEvents);
};