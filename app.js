//? external dependencies
const express = require("express");

//?constants
const app = express();
const PORT = process.env.PORT || 3000

//?instance route
app.get("/", (req, res) => {
    res.json({ message: "welcome to my app" })
})

//?listening to the server
app.listen(PORT, () => {
    console.log("listening to the port", PORT)
})