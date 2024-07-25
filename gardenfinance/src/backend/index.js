const express = require('express');
const cors = require('cors');
const { initiateSwap } = require('./swap');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/swap', async (req, res) => {
  try {
    const { privateKey, sendAmount } = req.body;
    const result = await initiateSwap(privateKey, sendAmount);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
