const express = require('express');
const fetch = require('node-fetch');
const { ConfidentialClientApplication } = require('@azure/msal-node');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3978;

app.use(express.static('public'));

async function getAccessToken() {
  const tenantId = process.env.TENANT_ID;
  const msalConfig = {
    auth: {
      clientId: process.env.CLIENT_ID,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret: process.env.CLIENT_SECRET
    }
  };

  const cca = new ConfidentialClientApplication(msalConfig);
  const result = await cca.acquireTokenByClientCredential({
    scopes: [`api://${process.env.RESOURCE_APP_ID}/.default`]
  });
  return result.accessToken;
}

app.get('/api/token', async (req, res) => {
  try {
    const aadToken = await getAccessToken();
    const response = await fetch('https://api.gov.powerplatform.microsoft.us/CopilotStudio.Copilots.Invoke', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${aadToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        schemaName: process.env.SCHEMA_NAME,
        environmentId: process.env.ENVIRONMENT_ID
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Copilot API returned ${response.status}: ${text}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
