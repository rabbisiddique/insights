require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const verifyRouter = require("./routes/verify.route");
const noteRouter = require("./routes/note.route");
const aiRouter = require("./routes/ai.route");
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./utils/passport");
require("./config/ai");
// require("./utils/rateLimiter");
const app = express();

const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);
app.use(passport.initialize());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api", verifyRouter);
app.use("/api/note", noteRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => console.log(connectToDB(), `http://localhost:${PORT}`));
