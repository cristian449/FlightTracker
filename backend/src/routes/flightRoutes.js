import FlightsController from "../controllers/FlightsController.js";

export default (app) => {
    app.route('/api/v1/flights')
        .get(FlightsController.getAll)
        .post(FlightsController.create);
    app.route('/api/v1/flights/:id')
        .get(FlightsController.getById)
        .delete(FlightsController.remove)
        .put(FlightsController.updateById);

    //FlightEvents
    app.route('/api/v1/flights/:id/events')
        .get(FlightsController.getEvents);
};