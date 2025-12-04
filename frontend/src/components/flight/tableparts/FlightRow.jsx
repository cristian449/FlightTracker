import BookButton from "../../booking/BookButton.jsx";

export default function FlightRow({ flight }) {
    return (
        <tr>
            <td>{flight.name}</td>
            <td>{flight.from}</td>
            <td>{flight.to}</td>
            <td>{flight.length}</td>
            <td>
                <BookButton flight={flight} />
            </td>
        </tr>
    );
}
