import { app } from "./app.js";
import connectDb from "./data/database.js";

// Mongoose Connection
connectDb();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
