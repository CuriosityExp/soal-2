if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const UserController = require("./controllers/user");
const errorHandler = require("./middlewares/errorHandles");
const app = express();
const port = process.env.PORT || 3000; 
const cors = require('cors');
const authentication = require("./middlewares/authentication");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Online");
});

app.post("/login", UserController.postLogin);
app.use(authentication)
app.get("/users", UserController.getAllUser);
app.post("/register", UserController.postRegister)
app.put("/users/:id", UserController.updateUser)
app.delete("/users/:id", UserController.deleteUser)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Soal 2 app listening on port ${port}`);
});
