import { db } from "./dbConfig.js";

export const userService = {
    createUser: async (username, hashedPassword) => {
        const existing = await db.Users.findByPk(username);
        if (existing) {
            throw new Error("Username already exists");
        }
        await db.Users.create({ username, password: hashedPassword });
        return { username };
    },

    getUser: async (username) => {
        const user = await db.Users.findByPk(username);
        return user ? user.get({ plain: true }) : undefined;
    },
};
