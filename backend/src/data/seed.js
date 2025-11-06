export default async (db) => {
    await db.Flights.findOrCreate({
        where: { name: "Flight 456 Boston to Miami" },
        defaults: {
            name: "Flight 456 Boston to Miami",
            from: "Boston",
            to: "Miami",
            length: "4-5 hours"
        },
    });

    await db.Users.findOrCreate({
        where: { username: "Tiit" },
        defaults: {
            username: "Tiit",
            password: "pass"
        },
    });
};
