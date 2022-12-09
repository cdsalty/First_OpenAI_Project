const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
// Enable body parser
app.use(express.json());
// this is allow us to accept body data that comes in from request.body
app.use(express.urlencoded({ extended: false }));

// Setup middleware/static folder to route to our public page
app.use(express.static(path.join(__dirname, "public")));

// for the route /openai, we want to require the openaiRoutes
app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => console.log(port, `server started on port ${port}`));
