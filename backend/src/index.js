import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import flightRoutes from './routes/flightRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', async (req, res) => {
    res.status(200).type('text/html').send(`<a href="/docs">swagger</a>`);
});

flightRoutes(app);
userRoutes(app);

const PORT = process.env.PORT;

httpServer.listen(PORT, async () => {
    console.log(`Server is running at http://${process.env.HOST}:${PORT}/`);
});

export { httpServer, app };