const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const storeRoutes = require("./routes/store");
const usersRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});

app.use("/api", storeRoutes);
app.use("/api/users", usersRoutes);
app.use(express.json());
