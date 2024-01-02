const express = require("express");
const app = express();
const port = 3001;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const { users } = require("./mongoDB.json");

app.post("/checkLogin", async (req, res) => {
  try {
    const { username, password } = await req.body;

    console.log(users);

    console.log(username, password);

    res.send("Hello world");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
