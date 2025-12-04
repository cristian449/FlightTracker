import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingHistory() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/users/opilane/bookings"
                );

                setBookings(response.data);
            } catch (error) {
                console.error("Failed to load bookings", error);
            }
        };

        loadBookings();
    }, []);

    const removeBooking = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/v1/bookings/${id}`);
        setBookings(bookings.filter(b => b.id !== id));
    } catch (err) {
        console.error("Failed to remove booking", err);
    }
    };


    return (
        <div>
            <h2>Your Bookings</h2>
            <table>
                <thead>
                    <tr>
                        <th>Flight</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Length</th>
                        <th>Date Booked</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td>{b.Flight?.name}</td>
                            <td>{b.Flight?.from}</td>
                            <td>{b.Flight?.to}</td>
                            <td>{b.Flight?.length}</td>
                            <td>{new Date(b.bookingdate).toLocaleString()}</td>
                            <td>
                                <button onClick={() => removeBooking(b.id)}>
                                    Cancel Booking
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
