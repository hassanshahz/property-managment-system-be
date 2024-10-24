const asyncHandler = require('express-async-handler');
const Meeting = require('../model/MeetingModel');
const createGoogleCalendarEvent = require('../googleClender/googleCalender');
const sendEmail = require('../googleClender/sendEmail');
const User = require('../model/ClientModel');

const createMeeting = asyncHandler(async (req, res) => {
  const { property, userEmail, agentEmail, meetingTime } = req.body;

  const user = await User.findOne({ role: 'user', email: userEmail });
  const agent = await User.findOne({ role: 'agent', email: agentEmail });

  if (!user || !agent) {
    return res.status(400).json({ message: 'User or agent not found' });
  }

  // Create a Google Calendar event
  let event;
  try {
    event = await createGoogleCalendarEvent({
      title: 'Property Viewing',
      location: 'Online',
      description: `Meeting regarding property: ${property}`,
      startDateTime: meetingTime,
      endDateTime: new Date(new Date(meetingTime).getTime() + 60 * 60 * 1000),
      attendees: [{ email: user.email }, { email: agent.email }],
    });
    console.log('Event created:', event);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return res.status(500).json({ message: 'Failed to create calendar event' });
  }

  // Save meeting to the database
  const meeting = await Meeting.create({
    property,
    user: user._id,
    agent: agent._id,
    admin: req.user.id,
    meetingTime,
    googleMeetLink: event.hangoutLink,
  });

  // Send email notifications to user and agent
  const emailText = `You have a meeting scheduled. Google Meet link: ${event.hangoutLink}`;
  await sendEmail(user.email, 'Meeting Scheduled', emailText);
  await sendEmail(agent.email, 'Meeting Scheduled', emailText);

  res.status(201).json({ message: 'Meeting created successfully', meeting });
});

module.exports = { createMeeting };
