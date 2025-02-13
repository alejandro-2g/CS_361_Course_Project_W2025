const express = require("express");
const router = express.Router();

let conversionHistory = [];

router.get("/", (req, res) => {
    res.json(conversionHistory);
});

router.post("/", (req, res) => {
    const { amount, from, to, result } = req.body;

    if (!amount || !from || !to || !result) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const conversion = { amount, from, to, result, date: new Date().toISOString() };
    conversionHistory.push(conversion);
    res.json({ message: "Conversion saved", conversion });
});

module.exports = router;
