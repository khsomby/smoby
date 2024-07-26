const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.post(
      'https://typli.ai/api/generators/completion',
      {
        prompt: query,
        temperature: 1.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer undefined',
        },
      }
    );
    res.json({ response: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate text. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
