import AirportRow from "./tableParts/AirportRow.jsx";
import FlightRow from "./tableParts/FlightRow.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightsTable() {
    const [flights, setFlights] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/flights");
                const flightsData = response.data;

                setFlights(flightsData);
                categorizeFlights(flightsData);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, []);

    const categorizeFlights = (flightsList) => {
        if (!flightsList || flightsList.length === 0) {
            setRows([]);
            return;
        }

        const rows = [];
        let lastAirport = null;

        flightsList.forEach((flight) => {
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
