import { useState } from "react";
import SearchBar from "../common/searchBar.jsx";
import FlightsTable from "./FlightsTable.jsx";

export default function FilterableFlightsTable() {
    const [searchText, setSearchText] = useState("");

    return (
        <div>
            <SearchBar searchText={searchText} onSearch={setSearchText} />
            <FlightsTable searchText={searchText} />
        </div>
    );
}
