require("dotenv").config();

const express = require("express");
const { auth } = require("./Middleware/auth");

// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

require("./DL/db").connect();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api/user/post", auth, require("./Routes/postRouter"));

app.use("/api/user/like", auth, require("./Routes/likeRouter"));
app.use("/api/user/comment", auth, require("./Routes/commentRouter"));
app.use("/api/user/follow", auth, require("./Routes/followRouter"));

app.use("/api/authuser", require("./Routes/userRouter"));

// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
const PORT = 5000 || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
