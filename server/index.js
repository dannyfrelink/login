const express = require("express");
const app = express();
const port = 3001;
const fetch = require("node-fetch");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/checkLogin", async (req, res) => {
  try {
    const { username, password } = await req.body;

    console.log(username, password);

    res.send("Hello world");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
