const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require("./config/ConnectDB");
const cors = require("cors");
const ErrorHandler = require('./middleware/ErrorHandler');
const rateLimiter = require('express-rate-limit');


const app = express();

const port = process.env.PORT || 5000;

const apiLimiter = rateLimiter({
    windowMs : 5 * 60 * 1000,
    max : 1000,
    message : 'too many request from this ip address please try again after 5 mintues',
});

app.use("/api", apiLimiter);

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.options('*', cors());


app.use(express.json());
app.use('/api', require('./route/MeetingRoute'));
app.use('/api/agency', require('./route/AgencyRoute'));
app.use('/api/property', require('./route/PropertyRoute'));
app.use('/api/agent', require('./route/AgentRoute'));
app.use('/api/client', require('./route/ClientRoute'));
app.use(ErrorHandler);
connectDb();

app.listen(port,()=>{
    console.log(`Server is listen on the port ${port}`);
});