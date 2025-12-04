import AuthController from "../controllers/AuthController.js";

export default (app) => {
    app.post("/api/v1/auth/register", AuthController.register);
    app.post("/api/v1/auth/login", AuthController.login);
};
