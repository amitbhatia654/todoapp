const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const taskRoute = require("./Routes/taskRoute");
const connectDb = require("./db");

app.use(express.json());

const port = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// this is the middleware
app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (req, res) => res.send("Server is created succesfully"));
app.use("/api/", taskRoute);
connectDb();

app.listen(port, () => console.log("server is running on port", port));
