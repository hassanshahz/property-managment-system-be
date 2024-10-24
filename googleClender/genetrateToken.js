const { google } = require('googleapis');
const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Step 1: Redirect user to this URL
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  res.redirect(authUrl);
});

// Step 2: Handle the Google OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;

  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Tokens:', tokens);

    // You will see the refresh token here, save it securely for future use
    console.log('Refresh Token:', tokens.refresh_token);
    res.send('Authorization successful! You can now copy the refresh token.');
  } else {
    res.send('No code provided.');
  }
});
