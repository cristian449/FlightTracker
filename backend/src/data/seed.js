export default async (db) => {
    const [flight, flightCreated] = await db.Flights.findOrCreate({
        where: { name: "Flight 456 Boston to Miami" },
        defaults: {
            name: "Flight 456 Boston to Miami",
            from: "Boston",
            to: "Miami",
            length: "4–5 hours"
        },
    });
    console.log("Flight created:", flightCreated);

    const [user, userCreated] = await db.Users.findOrCreate({
        where: { username: "opilane" },
        defaults: {
            username: "opilane",
            password: "$2a$10$OjEII2iqxMpjdd8kSEZty.ZNVVqLjm1YtHDWBpqxyMstdV09XlfSy"
        }
    });
    console.log("User created:", userCreated);


    const [booking, bookingCreated] = await db.Bookings.findOrCreate({
        where: { id: 1 },
        defaults: {
            FlightId: flight.id,
            UserUsername: user.username,
            bookingdate: new Date()
        }
    });
    console.log("Booking created:", bookingCreated);

    console.dir(booking.get({ plain: true }), { depth: null });
};
