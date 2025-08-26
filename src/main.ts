import express from "express";
import config from "./config/config.js";

const app = express();

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
