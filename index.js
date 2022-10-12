const express = require('express');
const app = express();
const axios = require('axios');
const cron = require('node-cron');
// const port = 8095;
const port = process.env.MS_PORT;
const checkSchedulePayload = require('./payloads/CheckSchedulePayload.js');
const updateServerPayload = require('./payloads/UpdateServerPayload.js');
const checkServerPayload = require('./payloads/CheckServerSchedulePayload')
const initialPullPayload = require('./payloads/InitialPullPayload')
// const url = "http://host.docker.internal:8082";
const url = process.env.DL_API_URL;
app.use(express.json());


// used to check the secondary schedule
const secondaryScheduleInterval = process.env.SECONDARYSCHEDINT;

// used to update the primary db
const updatePrimaryInterval = process.env.UPDATEPRIMARYINT;

// used to check the primary schedule 
const checkPrimaryInterval =  process.env.CHECKPRIMARYINT;


//var secondaryScheduleInterval = '* * * * *';
/**
 * Checks Secondary for any scheduled downloads that need to be started.
 */
var task = cron.schedule(secondaryScheduleInterval, () => {
    axios.post(url, checkSchedulePayload,{
        headers: {
          'Content-Type': 'application/json',
     }})
     .then(function (response) {
        console.log(" ** JSON Sent");
        //console.log(response);
     })
     .catch(function (error) {
        // handle error
        console.log(error);
     });
    console.log('Checks for schedules every minute');
});


//var updatePrimaryInterval = '*/2 * * * *';
/**
 * Checks for any changed download info on Secondary and pushes to Primary.
 */
var serverUpdate = cron.schedule(updatePrimaryInterval, () =>{
    axios.post(url, updateServerPayload,{
        headers: {
          'Content-Type': 'application/json',
     }})
     .then(function (response) {
         console.log(" ** JSON Sent");
         //console.log(response);
     })
     .catch(function (error) {
         // handle error
         console.log(error);
     });
    // console.log('checks for primary updates every 10 mins');
    console.log('Checks for updates to be pushed to Primary every 2 minutes');
});


//var checkPrimaryInterval = '*/3 * * * *';
/**
 * Checks for any scheduled downloads on the Primary to push to the Secondary.
 */
var checkPrimary = cron.schedule(checkPrimaryInterval, () =>{
    axios.post(url, checkServerPayload,{
        headers: {
          'Content-Type': 'application/json',
     }})
     .then(function (response) {
         console.log(" ** JSON Sent");
         //console.log(response);
     })
     .catch(function (error) {
         // handle error
         console.log(error);
     });
    console.log('Checks Primary for new scheduled downloads every 3 minutes');
});


/**
 * 
 */
app.listen(port, async () => {
    console.log('Listening on port ' + port + "...", '\n');

    // Axios call to MongoAPI to update Secondary database with initial data from Primary.
    await axios.post(url, initialPullPayload, {
        headers: {
            'Content-Type': 'application/json',
    }})
    .then(function (response) {
        console.log(" ** Intial Pull JSON Sent");
    })
    .catch(function (error) {
        console.log(error);
    })    

    // Starts every cron job.
    task.start();
    serverUpdate.start();
    checkPrimary.start();
    console.log('started\n');
});