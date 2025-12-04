import React, { useState } from "react";
import axios from "axios";

 
export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/api/v1/auth/register", {
                username,
                password
            });

            alert("Registration successful!");

        } catch (error) {
            alert("Registration failed: " + error.response?.data?.error);
        }
    };

    return (
        <form onSubmit={submit}>
            <h2>Register</h2>

            <input placeholder="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input placeholder="Password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Register</button>
        </form>
    );
}
