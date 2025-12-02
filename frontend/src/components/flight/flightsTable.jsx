import AirportRow from "./tableParts/AirportRow.jsx";
import FlightRow from "./tableParts/FlightRow.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightsTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {

        const categorizeFlights = (flights) => {
            const rows = [];
            let lastAirport = null;

            flights.forEach((flight) => {
                if (flight.from !== lastAirport) {
                    rows.push(
                        <AirportRow
                            airport={flight.from ?? "Unknown"}
                            key={`airport-${flight.from ?? "unknown"}`}
                        />
                    );
                }

                rows.push(
                    <FlightRow
                        flight={flight}
                        key={`flight-${flight.id}`}
                    />
                );

                lastAirport = flight.from;
            });

            setRows(rows);
        };

        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/flights");
                const flightsData = response.data;
                categorizeFlights(flightsData);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();

    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Length</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
