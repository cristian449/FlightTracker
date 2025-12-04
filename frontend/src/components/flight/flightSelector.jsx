import { useEffect, useState } from "react";
import axios from "axios";

export default function FlightSelector({ onFlightSelected }) {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        const loadFlights = async () => {
            const res = await axios.get("http://localhost:8000/api/v1/flights/select-list");
            setOptions(res.data);
        };

        loadFlights();
    }, []);

    const handleAdd = async () => {
        if (!selected) return;

        // Send booking to backend
        await axios.post("http://localhost:8000/api/v1/bookings", {
            flightId: selected,
            username: "opilane"
        });

        // Notify parent
        onFlightSelected(selected);
    };

    return (
        <div style={{ margin: "20px 0" }}>
            <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
                style={{ padding: "5px", marginRight: "10px" }}
            >
                <option value="">Choose a flight...</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <button onClick={handleAdd}>
                Add to My Flights
            </button>
        </div>
    );
}
