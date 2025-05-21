# CustomUI

This sample shows how to build a custom web interface for a Copilot Studio bot using the standard Bot Framework WebChat control.

## Setup

1. Install Node.js.
2. Copy `.env.example` to `.env` and provide the secret for your Azure AD application.
3. Run `npm install` to install dependencies.
4. Start the server with `npm start`.
5. Open [http://localhost:3978](http://localhost:3978) in your browser.

## Configuration

The `.env` file contains all required identifiers:

- `TENANT_ID` – directory (tenant) ID.
- `CLIENT_ID` – application (client) ID.
- `CLIENT_SECRET` – secret generated for the application registration.
- `SCHEMA_NAME` – schema name of the Copilot agent.
- `ENVIRONMENT_ID` – environment hosting the Copilot.
- `RESOURCE_APP_ID` – resource ID used for token acquisition.

The server obtains an Azure AD token and calls the CopilotStudio invocation API to generate the parameters needed for WebChat.
