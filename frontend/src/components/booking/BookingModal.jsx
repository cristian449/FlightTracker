import axios from "axios";

export default function BookingModal({ flight, closeModal }) {
    const handleBooking = async () => {
        try {
            await axios.post("http://localhost:8000/api/v1/bookings", {
                flightId: flight.id,
                username: "opilane" // later replaced with real auth
            });

            alert("Flight booked successfully!");
            closeModal();
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed.");
        }
    };

    return (
        <div style={modalStyle}>
            <div style={containerStyle}>
                <h2>Book this flight?</h2>
                <p><strong>{flight.name}</strong></p>
                <p>{flight.from} → {flight.to}</p>
                <p>Length: {flight.length}</p>

                <button onClick={handleBooking}>Confirm Booking</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
}

const modalStyle = {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const containerStyle = {
    background: "#222",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    color: "white",
    border: "1px solid #555"
};
