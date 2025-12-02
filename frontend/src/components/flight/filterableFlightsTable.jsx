import SearchBar from "../common/searchBar.jsx";
import FlightTable from "./flightsTable.jsx";

export default function FilterableFlightsTable() {
    return (
        <div>
            <SearchBar />
            <FlightTable />
        </div>
    );
}