export default function SearchBar({ searchText, onSearch }) {
    return (
        <form style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Search by city, destination, or name..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                style={{
                    padding: "8px",
                    width: "250px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                }}
            />
        </form>
    );
}
