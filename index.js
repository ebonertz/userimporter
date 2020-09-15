const integrifyLambda = require('integrify-aws-lambda');
const fetch = require('node-fetch');
const csv = require('csvtojson');
const parser = require('csv-parser');
const testUser = require('./test.js');
const creds = require('./config.js');
var fs = require('fs');
var path = require('path');
var map = require('map-stream')
var vfs = require('vinyl-fs');
var buffStream = require("vinyl-source-buffer")

//create a new Integrfiy AWS Lambda object passing in a configuration object with inputs, outputs and your execute function
var config = {
  helpUrl: "http://www.integrify.com",
  inputs: [
      {key:"requestSid", type:"string"},
      {key:"file", type:"file"},
      {key:"username", type:"string"},
      {key:"email", type:"string"},
      {key:"password", type:"string"}],
  outputs:[{key:"successMessage", type:"string"}]
}

//Obtain Access Token with Impresonate
const getAccessToken = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    // const site = 'https://services7.integrify.com'
    const url = `${creds.site}/access/impersonate?key=${creds.key}&user=${creds.user}`

    console.log(`Request url:${url}`);

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
}

// getAccessToken()

const token = "867086fa4ffe4182ad479256ac59d8c3"


 //get a list of files from integrify for the request using the REST API
    //files/instancelist/:instance_sid

const getFiles = (token) => {
  
  var requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer <token>'
    },
    redirect: 'follow'
  };
  const url = "https://services7.integrify.com/files/instancelist/1504168b-47f2-43c5-8650-94fadd4dd8ee"

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .then((result) => {
      return 
    })
    .catch(error => console.log('error', error));
} 

getFiles();

//Parse the Stream Endpoint out of the response
// const integrifyFile = results
// const intefridyFileUrl = integrifyFile.StreamEndpoint;

//Take file from Stream Endpoint and Convert to JSON and maps to fit JSON body format

const convertCSV = () => {
    // use npm package to convert csv import file to a JSON format
    const converter = csv()
    .fromFile('./data.csv')
    .then((json)=>{
        console.log(json);
    })
}

// convertCSV()
//Returns JSON format and assigns to a body variable 
// Array of User Objects 

const importUsers = (usersDetails) => {

var raw = JSON.stringify({"AddressLine1":"","AddressLine2":"","City":"","CostCenter":"","Country":"","Custom1":"","Custom2":"","Department":"","Division":"","Email":"tester@integrify.com","Locale":"en-US","Location":"","ManagerSID":"","NameFirst":"Import","NameLast":"Test","NameMiddle":"","NetworkID":"","Password":"test123","PasswordConfirm":"test123","Phone":"","Postal":"","State":"","TimeZone":"Pacific Standard Time","Title":"","UserName":"importtest"});

var requestOptions = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>'
  },
  redirect: 'follow',
  body: raw
};

fetch("https://services7.integrify.com/users/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('Error importing users', error));

};

importUsers();


// Get list of
const getExistingingUsers = (token) => {
  // Calls to Users endpoints and returns all users. 
  // Parse to array of usernames to compare on
  
  var requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer <token>'
    },
    redirect: 'follow'
  };
  
  fetch("https://services7.integrify.com/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

getExistingingUsers()

const compareJSON = () => {
  //takes usersimport json from csv and existinguser json and runs a comparison by username
  //map each entry by user name
  //add new users to one array (user name does not already exists)
  //add existing users to another array (username exists already)
}


let myLambda = new integrifyLambda(config)
exports.handler = myLambda.handler
