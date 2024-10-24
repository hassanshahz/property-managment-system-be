const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const createGoogleCalendarEvent = async ({ title, location, description, startDateTime, endDateTime, attendees }) => {
  const event = {
    summary: title,
    location: location,
    description: description,
    start: {
      dateTime: startDateTime,
      timeZone: 'America/Los_Angeles',  // Replace with your timezone
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'America/Los_Angeles',
    },
    attendees: attendees.map(email => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data;
};

module.exports = createGoogleCalendarEvent;
