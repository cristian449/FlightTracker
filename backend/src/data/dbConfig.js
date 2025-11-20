import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import FlightModel from "./Flightmodel.js";
import UserModel from "./userModel.js";
import BookingModel from "./Bookingmodel.js";
import Flighteventmodel from "./Flighteventmodel.js";
import relations from "./relations.js";
import seed from "./seed.js";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";
console.log("isTest:", isTest);

const sequelize = isTest
    ? new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        define: {
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        }
    })
    : new Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_FILE,
        logging: false,
        define: {
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        }
    });

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();


const db = {};
db.Flights = FlightModel(sequelize, DataTypes);
db.Users = UserModel(sequelize, DataTypes);
db.Bookings = BookingModel(sequelize, DataTypes);
db.FlightEvents = Flighteventmodel(sequelize, DataTypes);



relations(db);

const sync = async () => {
    await sequelize.sync({ force: true });
    console.log("All models synchronized.");
};

if (process.env.DB_SYNC === "true") {
    await sync();

    if (process.env.DB_SEED === "true") {
        try {
            await seed(db);
            console.log("Seeding succeeded!");
        } catch (e) {
            console.error("Seeding failed:", e.message);
        }
    }
}

export { sequelize, sync, db };


