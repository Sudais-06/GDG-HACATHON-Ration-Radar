const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/elevenlabs/signed-url', async (req, res) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return res.status(503).send('ElevenLabs is not configured yet. Add ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID to your .env file.');
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`, {
      method: 'GET',
      headers: { 'xi-api-key': apiKey }
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error('ElevenLabs signed URL request failed:', response.status, detail);
      return res.status(502).send('ElevenLabs could not create a voice session. Check your API key, agent ID and agent authentication settings.');
    }
    const data = await response.json();
    if (!data.signed_url) return res.status(502).send('ElevenLabs did not return a signed session URL.');
    res.type('text/plain').send(data.signed_url);
  } catch (error) {
    console.error('ElevenLabs connection error:', error);
    res.status(502).send('Could not reach ElevenLabs. Please try again.');
  }
});

app.use(express.static(__dirname));
app.listen(PORT, () => console.log(`Ration Radar running at http://localhost:${PORT}`));
