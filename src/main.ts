import { app } from "./application/app.js";
import config from "./config/config.js";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
