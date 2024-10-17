import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//option 1 . allow all origins with default of cors(*)
app.use(cors());

//option 2. allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

app.use("/books", bookRoute);

app.listen(PORT, () => {
  console.log(`App is in port : ${PORT}`);
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App is connected to database`);
  })
  .catch((error) => {
    console.log(error);
  });
