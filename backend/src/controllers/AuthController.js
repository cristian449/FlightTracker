import bcrypt from "bcryptjs";
import { db } from "../data/dbConfig.js";

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: "Username and password required" });
    }

    if (password.length < 6) {
        return res.status(400).send({ error: "Password must be at least 6 character long"   });
    }

    try {
        const existing = await db.Users.findByPk(username);
        if (existing) {
            return res.status(400).send({ error: "Username already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await db.Users.create({
            username,
            password: hashed
        });


        return res.status(201).send({ 
            message: "User registered!",
            username 
        });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: "Username and password required" });
    }

    try {
        const user = await db.Users.scope("withPassword").findByPk(username);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const correct = await bcrypt.compare(password, user.password);

        if (!correct) {
            return res.status(400).send({ error: "Incorrect password" });
        }

        return res.status(200).send({
            message: "Login successful",
            username: user.username
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

export default { register, login };
