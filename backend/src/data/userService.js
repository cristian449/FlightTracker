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

     getUsers: async () => {
        const users = await db.Users.findAll({
            attributes: ["username"],
        });
        return users.map(u => u.get({ plain: true }));
    },



    updateUser: async (username, user) => {
         const [updatedCount, _] = await Users.update(user, {where: {username}});
            if (updatedCount > 0) {
                return await Users.findByPk(username);
        }
         return null;
    },

    deleteUser: async (username) => {
        const deleteResult = await db.Users.destroy({
            where: { username }
        });

        return deleteResult !== 0;
    }

};

