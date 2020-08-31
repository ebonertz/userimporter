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

console.log(creds)

//create a new Integrfiy AWS Lambda object passing in a configuration object with inputs, outputs and your execute function
// var config = {
//   helpUrl: "http://www.integrify.com",
//   inputs: [
//       {key:"requestSid", type:"string"},
//       {key:"file", type:"file"},
//       {key:"username", type:"string"},
//       {key:"password", type:"string"},
//   outputs:[{key:"successMessage", type:"string"}]
// }


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

getAccessToken()

const token = " "


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

const addNewUsers = () => {
    // for loop to create new users for all usernames in the new users array
    // calls integrify api /users endpoint and returns SID
    // on failure returns error message 
    const body = { a: 1 };
 
fetch('https://httpbin.org/post', {
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
}

// Get list of
const getExistingingUsers = (token) => {
  // Calls to Users endpoints and returns all users. 
  // Parse to array of usernames to compare on
  
  var requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer {{token}}'
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


// let myLambda = new IntegrifyLambda(config)

// exports.handler = myLambda.handler
