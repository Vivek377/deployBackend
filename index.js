const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoute = require("./routes/user.routes");
const noteRoute = require("./routes/notes.routes");
const authenticate = require("./middleware/auth.middleware");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use(authenticate);
app.use("/notes", noteRoute);

app.listen(process.env.PORT, async (req, res) => {
    try {
        await connection;
        console.log("connected");
    } catch (e) {
        console.log(e);
    }
})
