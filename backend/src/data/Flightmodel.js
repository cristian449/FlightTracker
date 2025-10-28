import { sequelize } from "./dbConfig.js";
import { DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const Flights = sequelize.define(
    "Flight",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

console.log("SYNC", process.env.DB_SYNC === "true");
if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    console.log("SEED", process.env.DB_SEED === "true");
    if (process.env.DB_SEED === "true") {
        await Flights.findOrCreate({
            where: { name: "New York - Boston" },
            defaults: { name: "New York - Boston" },
        });
    }
}

export default Flights;
