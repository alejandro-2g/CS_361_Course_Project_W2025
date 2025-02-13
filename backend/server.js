const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Import microservices
const formatService = require("./services/format-service");
const historyService = require("./services/history-service");

// Use microservices
app.use("/api/format", formatService);
app.use("/api/history", historyService);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
