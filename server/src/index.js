require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const authRouter = require("./routes/auth.route");
const verifyRouter = require("./routes/verify.route");
const noteRouter = require("./routes/note.route");
const aiRouter = require("./routes/ai.route");
const { errorHandler } = require("./middleware/errorHandler");
const rootDir = path.resolve();

require("./utils/passport");
require("./config/ai");

const app = express();
const PORT = process.env.PORT || 7000;

// -------------------- Middleware --------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(rootDir, "/client/dist")));

const isProd = process.env.NODE_ENV === "production";

const allowedOrigin = isProd
  ? process.env.FRONTEND_URL // e.g., https://insights-k5t9.vercel.app
  : "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(passport.initialize());

// -------------------- API Routes --------------------
app.use("/api/auth", authRouter);
app.use("/api", verifyRouter);
app.use("/api/note", noteRouter);
app.use("/api/ai", aiRouter);

// -------------------- Serve React Frontend --------------------
// -------------------- Serve React Frontend --------------------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(rootDir, "/client/dist/index.html"));
});

// ---------- ---------- Error Handler --------------------
app.use(errorHandler);

// -------------------- Start Server --------------------

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
