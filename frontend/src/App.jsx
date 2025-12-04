import "./App.css";

import IndexPage from "./components/indexpage.jsx";
import LoginForm from "./components/authorization/LoginForm.jsx";
import RegisterForm from "./components/authorization/RegisterForm.jsx";

import FilterableFlightsTable from "./components/flight/filterableFlightsTable.jsx";
import BookingHistory from "./components/booking/BookingHistory.jsx";
import FlightSelector from "./components/flight/flightSelector.jsx";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const path = window.location.pathname;
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("user") || null);
    const [myFlights, setMyFlights] = useState([]);


    const requireLogin = () => {
        if (!loggedInUser) {
            window.location.href = "/";
            return false;
        }
        return true;
    };

 

    if (path === "/") {
        return <IndexPage />;
    }


    if (path === "/login") {
        return (
            <LoginForm
                onLogin={(username) => {
                    localStorage.setItem("user", username);
                    setLoggedInUser(username);
                    window.location.href = "/app";
                }}
            />
        );
    }


    if (path === "/register") {
        return (
            <RegisterForm
                onRegister={() => {
                    window.location.href = "/login";
                }}
            />
        );
    }


    if (path === "/bookings") {
        if (!requireLogin()) return null;

        return (
            <>
                <a href="/app" style={{ fontSize: "18px" }}>← Back</a>
                <BookingHistory />
            </>
        );
    }

    


    if (path === "/app") {
        if (!requireLogin()) return null;


        useEffect(() => {
            const load = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:8000/api/v1/users/${loggedInUser}/bookings`
                    );

                    const bookedFlights = res.data.map((b) => b.Flight);
                    setMyFlights(bookedFlights);
                } catch (err) {
                    console.error("Failed to load bookings:", err);
                }
            };

            load();
        }, [loggedInUser]);

        return (
            <>

                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <span style={{ marginRight: "15px" }}>
                        Logged in as <strong>{loggedInUser}</strong>
                    </span>

                    <a href="/bookings" style={{ marginRight: "15px" }}>My Bookings</a>

                    <button
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/";
                        }}>
                        Logout
                    </button>
                </div>


                <h2>Your Selected Flights</h2>
                {myFlights.length === 0 ? (
                    <p>No flights selected.</p>
                ) : (
                    <ul>
                        {myFlights.map((f) => (
                            <li key={f.id}>
                                {f.name} — {f.from} → {f.to}
                            </li>
                        ))}
                    </ul>
                )}

                <FlightSelector
                    onFlightSelected={async (flightId) => {
                        try {
                            const res = await axios.get(
                                `http://localhost:8000/api/v1/flights/${flightId}`
                            );
                            setMyFlights((prev) => [...prev, res.data]);
                        } catch (err) {
                            console.error("Error selecting flight:", err);
                        }
                    }}
                />

 
                <FilterableFlightsTable />
            </>
        );
    }

    return <div>404 Not Found</div>;
}

export default App;
