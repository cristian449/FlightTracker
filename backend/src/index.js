import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { sync } from './data/dbConfig.js';
import { userService } from './data/userService.js';
import { gameService} from "./data/Flightservice.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

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