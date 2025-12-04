export default (db) => {
    // A User can book many Flights
    db.Users.belongsToMany(db.Flights, { through: db.Bookings });
    // A Flight can be booked by many Users
    db.Flights.belongsToMany(db.Users, { through: db.Bookings, as: "Customers" });

    db.Bookings.belongsTo(db.Flights, { foreignKey: "FlightId" });
    db.Bookings.belongsTo(db.Users, { foreignKey: "UserUsername" });


    db.Flights.hasMany(db.FlightEvents, {
        foreignKey: "FlightId",
        onDelete: "CASCADE"
    });

    db.FlightEvents.belongsTo(db.Flights, {
        foreignKey: "FlightId"
    });
};