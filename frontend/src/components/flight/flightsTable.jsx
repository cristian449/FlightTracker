import AirportRow from "./tableparts/AirportRow.jsx";
import FlightRow from "./tableparts/FlightRow.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightsTable({ searchText }) {
    const [rowsLeft, setRowsLeft] = useState([]);
    const [rowsRight, setRowsRight] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/flights");
                let flights = response.data;

                if (searchText && searchText.trim()) {
                    const q = searchText.toLowerCase();
                    flights = flights.filter((f) =>
                        f.name.toLowerCase().includes(q) ||
                        f.from.toLowerCase().includes(q) ||
                        f.to.toLowerCase().includes(q)
                    );
                }

                const groupsInOrder = [];
                const groupMap = {};

                flights.forEach((flight) => {
                    const fromKey = flight.from || "Unknown";

                    if (!groupMap[fromKey]) {
                        groupMap[fromKey] = [];
                        groupsInOrder.push(fromKey); // keep insertion order plz
                    }
                    groupMap[fromKey].push(flight);
                });

                const allRows = [];

                groupsInOrder.forEach((airport) => {
                    allRows.push(
                        <AirportRow
                            key={`airport-${airport}`}
                            airport={airport}
                        />
                    );

                    groupMap[airport].forEach((flight) => {
                        allRows.push(
                            <FlightRow
                                key={`flight-${flight.id}`}
                                flight={flight}
                            />
                        );
                    });
                });

                // SPLITS INTO 2 COLUMNS for better asthetic
                // Will actually later split probably into more columns with pagination
                const half = Math.ceil(allRows.length / 2);
                setRowsLeft(allRows.slice(0, half));
                setRowsRight(allRows.slice(half));
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, [searchText]);

    return (
        <div
            style={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
                marginTop: "20px",
            }}
        >
            {/* Left */}
            <table style={{ width: "45%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Length</th>
                        <th>Departure</th>
                    </tr>
                </thead>
                <tbody>{rowsLeft}</tbody>
            </table>

            {/* RIGHT  */}
            <table style={{ width: "45%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Length</th>
                        <th>Departure</th>
                    </tr>
                </thead>
                <tbody>{rowsRight}</tbody>
            </table>
        </div>
    );
}
