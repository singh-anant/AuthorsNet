const express = require("express");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const multer = require("multer");
const cookieParser = require("cookie-parser");
// const img=require("")

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors());

// Authentication Route
app.use("/server/auth", authRoutes);

// Post Routes
app.use("/server/posts", postRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/server/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.listen(8080, () => {
  console.log("Connected to the Port...");
});
