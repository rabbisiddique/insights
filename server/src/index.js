require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const connectToDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const authRouter = require("./routes/auth.route");
const verifyRouter = require("./routes/verify.route");
const noteRouter = require("./routes/note.route");
const aiRouter = require("./routes/ai.route");
const { errorHandler } = require("./middleware/errorHandler");

// -------------------- Passport & AI Setup --------------------
require("./utils/passport");
require("./config/ai");

const app = express();
const PORT = process.env.PORT || 7000;

// -------------------- Middleware --------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// -------------------- CORS --------------------
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

// -------------------- API Routes --------------------
app.use("/api/auth", authRouter);
app.use("/api", verifyRouter);
app.use("/api/note", noteRouter);
app.use("/api/ai", aiRouter);

// -------------------- Serve React Frontend --------------------
const rootDir = path.resolve(__dirname, "../../"); // repo root
const clientDist = path.join(rootDir, "client/dist");

app.use(express.static(clientDist));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// -------------------- Error Handler --------------------
app.use(errorHandler);

// -------------------- Start Server --------------------
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server running on port: http://localhost:${PORT}`);
});
