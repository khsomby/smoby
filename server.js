const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  const { history } = req.body;
  
  try {
    const response = await axios.post(
      'https://typli.ai/api/generators/completion',
      {
        prompt: history.map(h => h.content).join('\n'),
        temperature: 1.2,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer undefined',
        },
      }
    );
    
    const generatedText = response.data?.choices?.[0]?.text || "No response from AI";
    res.json({ response: generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate text. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
