const express = require("express");
const app = express();
const port = 3001;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const { users } = require("./mongoDB.json");

function isStrongPassword(password) {
  // Check for at least one number, one special character, one lowercase letter, one uppercase letter, and no spaces
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;

  return passwordRegex.test(password);
}

app.post("/checkLogin", (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = users.find((user) => user.username === username);
    const checkPassword = isStrongPassword(password);
    let errors = [];

    if (findUser) {
      errors.push("username");
    }
    if (!checkPassword) {
      errors.push("password");
    }

    if (!findUser && checkPassword) {
      errors = [];

      users.push({
        username,
        password,
      });

      res.status(200).json({ success: "Successful login" });
    }

    if (errors.length > 0) {
      res.status(500).json({ errors });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
