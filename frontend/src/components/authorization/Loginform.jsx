import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/auth/login", {
                username,
                password
            });

            if (response.data && response.data.username) {
                onLogin(response.data.username);
            } else {
                alert("Login failed.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}
