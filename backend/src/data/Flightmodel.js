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
                },
        from: {
            type: DataTypes.STRING,
        },
        to: {
            type: DataTypes.STRING,
        },
        length: {
            type: DataTypes.STRING
        }
    }
);

console.log("SYNC", process.env.DB_SYNC === "true");
if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
    if (process.env.DB_SEED === "true") {
        await Flights.findOrCreate({
            where: {name: "Flight 456 Boston to Miami"},
            defaults: {
                name: "Flight 456 Boston to Miami",
                from: "Boston",
                to: "Miami",
                length: "4-5 hours"
            },
        });
    }
}

export default Flights;
