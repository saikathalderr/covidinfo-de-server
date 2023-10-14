import "module-alias/register";

import type { Application } from "express";
import Routes from "./routes";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 8080;
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Routes);

app.listen(PORT, () => {
  const message = `Server is running on http://localhost:${PORT}`;
  console.log(message);
});
