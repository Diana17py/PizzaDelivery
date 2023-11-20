const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const storeRoutes = require("./routes/store");
const usersRoutes = require("./routes/users");

app.use(cors({
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
}));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});

app.use("/api", storeRoutes);
app.use("/api/users", usersRoutes);
app.use(express.json());
