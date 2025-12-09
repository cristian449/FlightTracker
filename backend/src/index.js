import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import flightRoutes from './routes/flightRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs/swagger.json' with { type: "json" };
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.get('/', (req, res) => {
    res.status(200).type('text/html').send(`<a href="/docs">swagger</a>`);
});


flightRoutes(app);
userRoutes(app);
bookingRoutes(app);
authRoutes(app);


app.use(express.static(path.join(__dirname, "../dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});




const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { httpServer, app };
