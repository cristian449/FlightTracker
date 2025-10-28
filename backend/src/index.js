import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { sync } from './data/dbConfig.js';
import { userService } from './data/dataServices.js';
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.get('/', async (req, res) => {
    const user = await userService.getUser("Tiit");
    res.status(200).type('text/plain').send(`Hello, ${user.username}!`);
});

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    await sync();
    await userService.createUser("Tiit", "pass");

export { httpServer, app };