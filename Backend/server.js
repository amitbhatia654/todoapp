const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Server is created succesfully"));
const port = 5000;

app.listen(port, () => console.log("server is running on port", port));
