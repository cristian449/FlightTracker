export default function IndexPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h1>Welcome to FlightTracker/FlihtBooker</h1>

            <div style={{ marginTop: "30px" }}>
                <a href="/login">
                    <button style={{ padding: "10px 20px", marginRight: "15px" }}>
                        Login
                    </button>
                </a>

                <a href="/register">
                    <button style={{ padding: "10px 20px" }}>
                        Register
                    </button>
                </a>
            </div>
        </div>
    );
}
