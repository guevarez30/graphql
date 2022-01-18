import jwt from "jsonwebtoken";
import { compare } from "../helpers/encryption.js";

/* Please use env files for secrets */
const SECRET = "secret";

export const logIn = (database) => async (req, res) => {
    const { email, password } = req.body;
    const [user] = await database["user"].findMany({
        where: {
            AND: {
                email: email
            }
        }
    });

    if (!user) res.status(400).send({ error: "User doesnt exist" });
    else {
        const match = await compare(password, user.password);
        if (match) {
            const token = jwt.sign({ email: email }, SECRET, {
                expiresIn: "10h"
            });
            const auth = {
                token: token,
                type: "Bearer"
            };
            res.json(auth);
        } else res.status(401).send({ error: "Unauthorized" });
    }
};
