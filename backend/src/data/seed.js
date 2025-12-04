export default async (db) => {

const flightData = [
    { name: "Flight 101", from: "Tallinn", to: "Helsinki", length: "30 min" },
    { name: "Flight 202", from: "Tallinn", to: "Stockholm", length: "55 min" },
    { name: "Flight 303", from: "Tallinn", to: "Riga", length: "45 min" },
    { name: "Flight 404", from: "Tallinn", to: "Copenhagen", length: "1h 40m" },
    { name: "Flight 505", from: "Helsinki", to: "Tokyo", length: "10h 50m" },
    { name: "Flight 606", from: "London", to: "New York", length: "7h 30m" },
    { name: "Flight 707", from: "Berlin", to: "Dubai", length: "6h 20m" },
    { name: "Flight 808", from: "Warsaw", to: "Istanbul", length: "2h 40m" },
    { name: "Flight 909", from: "Paris", to: "Rome", length: "2h 10m" },
    { name: "Flight 999", from: "Boston", to: "Miami", length: "4–5 hours" },


    { name: "Flight 110", from: "Tallinn", to: "Berlin", length: "1h 50m" },
    { name: "Flight 111", from: "Berlin", to: "Tallinn", length: "1h 45m" },
    { name: "Flight 212", from: "Tallinn", to: "Oslo", length: "1h 40m" },
    { name: "Flight 313", from: "Tallinn", to: "Vilnius", length: "1h 10m" },  
    { name: "Flight 314", from: "Tallinn", to: "Vilnius", length: "1h 10m" },   
    { name: "Flight 515", from: "Helsinki", to: "Tallinn", length: "30 min" },
    { name: "Flight 616", from: "New York", to: "London", length: "7h 15m" },
    { name: "Flight 717", from: "Dubai", to: "Berlin", length: "6h 10m" },
    { name: "Flight 818", from: "Istanbul", to: "Warsaw", length: "2h 35m" },
    { name: "Flight 919", from: "Rome", to: "Paris", length: "2h 15m" },

    { name: "Flight 1001", from: "Madrid", to: "Lisbon", length: "1h 20m" },
    { name: "Flight 1002", from: "Lisbon", to: "Madrid", length: "1h 15m" },
    { name: "Flight 1003", from: "Amsterdam", to: "London", length: "1h 10m" },
    { name: "Flight 1004", from: "London", to: "Amsterdam", length: "1h 05m" },
    { name: "Flight 1005", from: "Tallinn", to: "Helsinki", length: "30 min" }, 
    { name: "Flight 1006", from: "Tallinn", to: "Helsinki", length: "30 min" },  
    { name: "Flight 1007", from: "New York", to: "Boston", length: "1h" },
    { name: "Flight 1008", from: "Boston", to: "New York", length: "1h" },
    { name: "Flight 1009", from: "Chicago", to: "Los Angeles", length: "4h 30m" },
    { name: "Flight 1010", from: "Los Angeles", to: "Chicago", length: "4h 25m" },

    { name: "Flight 1011", from: "Tokyo", to: "Seoul", length: "2h 20m" },
    { name: "Flight 1012", from: "Seoul", to: "Tokyo", length: "2h 10m" },
    { name: "Flight 1013", from: "Bangkok", to: "Singapore", length: "2h 30m" },
    { name: "Flight 1014", from: "Singapore", to: "Bangkok", length: "2h 25m" },
    { name: "Flight 1015", from: "Tallinn", to: "Stockholm", length: "50 min" }, 
    { name: "Flight 1016", from: "Tallinn", to: "Stockholm", length: "55 min" }, 
    { name: "Flight 1017", from: "Toronto", to: "Vancouver", length: "5h 00m" },
    { name: "Flight 1018", from: "Vancouver", to: "Toronto", length: "4h 55m" },
    { name: "Flight 1019", from: "Sydney", to: "Melbourne", length: "1h 25m" },
    { name: "Flight 1020", from: "Melbourne", to: "Sydney", length: "1h 20m" },

    { name: "Flight 1214", from: "Cairo", to: "Athens", length: "2h 15m"}
];


    function randomFutureDate() {
        const now = new Date();
        const sixMonthsMs = 1000 * 60 * 60 * 24 * 30 * 6;

        return new Date(now.getTime() + Math.random() * sixMonthsMs);
    }



    const seededFlights = [];

    for (const flight of flightData) {
        flight.departureTime = randomFutureDate();

        const [created, createdBool] = await db.Flights.findOrCreate({
            where: { name: flight.name },
            defaults: flight
        });

        console.log(`Flight "${flight.name}" created:`, createdBool);
        seededFlights.push(created);
    }


    const [user, userCreated] = await db.Users.findOrCreate({
        where: { username: "opilane" },
        defaults: {
            username: "opilane",
            password: "$2a$10$OjEII2iqxMpjdd8kSEZty.ZNVVqLjm1YtHDWBpqxyMstdV09XlfSy" // hashed
        }
    });

    console.log("User created:", userCreated);


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
