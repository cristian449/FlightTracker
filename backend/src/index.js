import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { sync } from './data/dbConfig.js';
// import { userService } from './data/userService.js';
import { userService } from './data/dataServices.js';
import { flightService} from "./data/Flightservice.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

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
    const games =await gameService.getGames();
    return res.json(games);
});


const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    await sync();
    await userService.createUser("Tiit", "pass");
    console.log(`Server is running at ${process.env.SERVER_URL}:${PORT}/`);
});

export { httpServer, app };