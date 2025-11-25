import AirportRow from "./tableParts/AirportRow.jsx";
import FlightRow from "./tableParts/FlightRow.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function FlightsTable({ flights }) {
    const rows = [];
    let lastAirport = null;

    flights.forEach((flight) => {
        if (flight.from !== lastAirport) {
            rows.push(
                <AirportRow
                    airport={flight.from}
                    key={`airport-${flight.from}`}
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
