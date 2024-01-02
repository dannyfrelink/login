const express = require("express");
const app = express();
const port = 3001;
const fetch = require("node-fetch");

app.get("/checkLogin", (req, res) => {
  try {
    res.send("Hello world");
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
