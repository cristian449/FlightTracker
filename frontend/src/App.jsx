import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import FilterableFlightsTable from "./components/flight/filterableFlightsTable.jsx";
import BookingHistory from "./components/booking/BookingHistory.jsx";
import FlightSelector from "./components/flight/flightSelector.jsx";

import axios from "axios";

function App() {
    const [count, setCount] = useState(0);
    const [myFlights, setMyFlights] = useState([]);

    const path = window.location.pathname;

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/v1/users/opilane/bookings"
                );

                const bookedFlights = res.data.map((b) => b.Flight);
                setMyFlights(bookedFlights);
            } catch (error) {
                console.error("Failed to load bookings:", error);
            }
        };

        if (path === "/") loadBookings();
    }, [path]);


    const handleFlightAdded = async (flightId) => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/v1/flights/${flightId}`
            );

 
            setMyFlights((prev) => [...prev, res.data]);
        } catch (error) {
            console.error("Failed to fetch added flight:", error);
        }
    };


    if (path === "/bookings") {
        return (
            <>
                <a href="/" style={{ fontSize: "18px" }}>← Back to Flights</a>
                <BookingHistory />
            </>
        );
    }


    return (
        <>
            <div style={{ textAlign: "center" }}>
                <a href="/bookings" style={{ fontSize: "18px" }}>
                    View My Bookings
                </a>
            </div>

            {/* ---- MY FLIGHTS LIST ---- */}
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <h2>Your Selected Flights</h2>
                {myFlights.length === 0 ? (
                    <p>No flights selected yet.</p>
                ) : (
                    <ul>
                        {myFlights.map((f) => (
                            <li key={f.id}>
                                {f.name} ({f.from} → {f.to})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <FlightSelector onFlightSelected={handleFlightAdded} />


            <FilterableFlightsTable />

            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React + FlightTracker</h1>

            <div className="card">
                <button onClick={() => setCount((c) => c + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>

            <p className="read-the-docs">
                FlightTracker front-end is now connected to your backend.
            </p>
        </>
    );
}

export default App;
