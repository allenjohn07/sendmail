const express = require("express");
const PORT = process.env.PORT || 6000;
const appRoute = require("./routes/route.js");
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(express.json())

app.use("/mail", appRoute);

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`));
