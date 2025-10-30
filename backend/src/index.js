import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { sync } from './data/dbConfig.js';
// import { userService } from './data/userService.js';
import { userService } from './data/dataServices.js';
import { flightService} from "./data/Flightservice.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.get('/api/v1/flights/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "URL does not contain ID" });
    }
    const flight = await flightService.getFlight(req.params.id);
    if (!flight) {
        return res.status(404).send({ error: "Flight not found" });
    }
    return res.json(flight);
});


app.get('/api/v1/flights', async (req, res) => {
    try {
        const flights = await flightService.getFlights();
        return res.json(flights);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});


const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    await sync();
    await userService.createUser("Tiit", "pass");
    console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };