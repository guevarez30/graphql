import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import PlayGround from "graphql-playground-middleware-express";
const expressPlayground = PlayGround.default;

/* Custom Modules */
import { schema } from "./schema.js";
import { database } from "./database.js";
import { models } from "./context.js";
/* Middleware */
import { userAuth, logIn } from "./middleware/auth.js";
import { logger } from "./middleware/logger.js";

/* Express app */
const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());

/* Custom Middlewares */
app.use(logger);
app.post("/login", logIn(database));

/* Graphql */
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.get("*", function (_req, res) {
  res.redirect("/playground");
});

app.use(userAuth(database));

app.use(
  "/graphql",
  graphqlHTTP(({ user }, _res) => ({
    schema,
    context: {
      user: user ?? undefined,
      models: models,
    },
    graphiql: true,
    customFormatErrorFn: (err) => ({ message: err.message }),
  }))
);

const port = 4000;
app.listen(port);
console.log(`APP listening on ${port}`);
