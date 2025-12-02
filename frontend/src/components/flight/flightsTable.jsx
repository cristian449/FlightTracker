import AirportRow from "./tableParts/AirportRow.jsx";
import FlightRow from "./tableParts/FlightRow.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function FlightsTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
    if (!flights || flights.length === 0) {
        setRows([]); 
        return;
    }

    const categorizeFlights = () => {
        const rows = [];
        let lastAirport = null;

        flights.forEach((flight) => {
            if (flight.from !== lastAirport) {
                rows.push(
                    <AirportRow
                        airport={flight.from ?? "Unknown"}
                        key={`airport-${flight.from ?? 'unknown'}`}
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
    }

    const fetchFlights = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/flights');
            const flightsData = response.data;
            categorizeFlights(flightsData);
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }
    fetchFlights().then(() => console.log("Flights fetched and categorized."));
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
