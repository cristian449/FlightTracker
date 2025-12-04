import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/login", {
                username,
                password
            });

            localStorage.setItem("user", response.data.username);
            onLogin(response.data.username);

        } catch (error) {
            alert("Login failed: " + error.response?.data?.error);
        }
    };

    return (
        <form onSubmit={submit}>
            <h2>Login</h2>
            <input placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input placeholder="Password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Login</button>
        </form>
    );
}
