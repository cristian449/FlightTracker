import SearchBar from "../common/searchBar.jsx";
import FlightTable from "./flightsTable.jsx";

export default function FilterableGamesTable({ flights }) {
    return (
        <div>
            <SearchBar />
            <FlightTable flights={flights} />
        </div>
    );
}