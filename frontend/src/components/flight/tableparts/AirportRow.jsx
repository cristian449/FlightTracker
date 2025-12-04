const COUNTRY_MAP = {
    "Tallinn": "Estonia",
    "Helsinki": "Finland",
    "Stockholm": "Sweden",
    "Riga": "Latvia",
    "Copenhagen": "Denmark",
    "Madrid": "Spain",
    "Lisbon": "Portugal",
    "Amsterdam": "Netherlands",
    "Tokyo": "Japan",
    "Boston": "USA",
    "New York": "USA",
    "Chicago": "USA",
    "Los Angeles": "USA",
    "Seoul": "South Korea",
    "Bangkok": "Thailand",
    "Singapore": "Singapore",
    "Dubai": "UAE",
    "Berlin": "Germany",
    "Rome": "Italy",
    "London": "United Kingdom",
    "Istanbul": "Türkiye",
    "Warsaw": "Poland",
    "Paris": "France",
    "Miami": "USA",
    "Oslo": "Norway",
    "Vilnius": "Lithuania",
    "Toronto": "Canada",
    "Vancouver": "Canada",
    "Sydney": "Australia",
    "Melbourne": "Australia",
    "Cairo": "Egypt"
};

export default function AirportRow({ airport }) {
    const country = COUNTRY_MAP[airport] || "Unknown Country";

    return (
        <tr>
            <th colSpan="5" style={{ 
                textAlign: "left",
                background: "#eee",
                padding: "6px",
                fontSize: "16px"
            }}>
                {airport} 
                <span style={{ color: "#888", marginLeft: "8px", fontSize: "14px" }}>
                    ({country})
                </span>
            </th>
        </tr>
    );
}
