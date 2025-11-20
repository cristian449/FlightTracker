export default function AirportRow({ airport }) {
    return (
        <tr>
            <th colSpan="5" style={{ textAlign: "left", background: "#eee" }}>
                {airport}
            </th>
        </tr>
    );
}
