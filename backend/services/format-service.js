const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { amount, rate, targetCurrency } = req.body;

    if (!amount || !rate || !targetCurrency) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const convertedAmount = (amount * rate).toFixed(2);
    res.json({ formatted: `${targetCurrency} ${convertedAmount}` });
});

module.exports = router;
