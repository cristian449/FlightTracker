export default async (db) => {

    //
    // 1. SEED 10 FLIGHTS
    //
    const flightData = [
        { name: "Flight 101 Tallinn → Helsinki", from: "Tallinn", to: "Helsinki", length: "30 min" },
        { name: "Flight 202 Tallinn → Stockholm", from: "Tallinn", to: "Stockholm", length: "55 min" },
        { name: "Flight 303 Tallinn → Riga", from: "Tallinn", to: "Riga", length: "45 min" },
        { name: "Flight 404 Tallinn → Copenhagen", from: "Tallinn", to: "Copenhagen", length: "1h 40m" },
        { name: "Flight 505 Helsinki → Tokyo", from: "Helsinki", to: "Tokyo", length: "10h 50m" },
        { name: "Flight 606 London → New York", from: "London", to: "New York", length: "7h 30m" },
        { name: "Flight 707 Berlin → Dubai", from: "Berlin", to: "Dubai", length: "6h 20m" },
        { name: "Flight 808 Warsaw → Istanbul", from: "Warsaw", to: "Istanbul", length: "2h 40m" },
        { name: "Flight 909 Paris → Rome", from: "Paris", to: "Rome", length: "2h 10m" },
        { name: "Flight 999 Boston → Miami", from: "Boston", to: "Miami", length: "4–5 hours" }
    ];

    const seededFlights = [];

    for (const flight of flightData) {
        const [created, createdBool] = await db.Flights.findOrCreate({
            where: { name: flight.name },
            defaults: flight
        });

        console.log(`Flight "${flight.name}" created:`, createdBool);
        seededFlights.push(created);
    }

    //
    // 2. SEED USER
    //
    const [user, userCreated] = await db.Users.findOrCreate({
        where: { username: "opilane" },
        defaults: {
            username: "opilane",
            password: "$2a$10$OjEII2iqxMpjdd8kSEZty.ZNVVqLjm1YtHDWBpqxyMstdV09XlfSy" // hashed
        }
    });

    console.log("User created:", userCreated);

    //
    // 3. CREATE ONE BOOKING (Flight #1 for opilane)
    //    Prevents duplicate spam and respects UNIQUE(User+Flight)
    //
    const firstFlight = seededFlights[0];

    const [booking, bookingCreated] = await db.Bookings.findOrCreate({
        where: {
            UserUsername: user.username,
            FlightId: firstFlight.id
        },
        defaults: {
            bookingdate: new Date()
        }
    });

    console.log("Booking created:", bookingCreated);
    console.dir(booking.get({ plain: true }), { depth: null });
};
