export default (db) => {
    // A User can book many Flights
    db.Users.belongsToMany(db.Flights, { through: db.Bookings });
    // A Flight can be booked by many Users
    db.Flights.belongsToMany(db.Users, { through: db.Bookings, as: "Customers" });

    db.Flights.hasMany(db.FlightEvents, {
        foreignKey: "FlightId",
        onDelete: "CASCADE"
    });

    db.FlightEvents.belongsTo(db.Flights, {
        foreignKey: "FlightId"
    });
};