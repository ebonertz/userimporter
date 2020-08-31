const integrifyLambda = require('integrify-aws-lambda');
const fetch = require('node-fetch');
const csv = require('csvtojson');
const parser = require('csv-parser');
const testUser = require('./test.js');
const config = require('./config.js');
console.log(config)

//Obtain Access Token with Impresonate
const getAccessToken = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    // const site = 'https://services7.integrify.com'
    const url = `${config.site}/access/impersonate?key=${config.key}&user=${config.user}`

    console.log(`Request url:${url}`);

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
}

getAccessToken()

const token = "858df16f61c643bc96443716e14dd844"

//Get CSV File from API by the Request GUID

const getCSV = (token) => {
  
  var requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 9daa495ba65f4d358ec1fcf7d503d8bd'
    },
    redirect: 'follow'
  };
  const url = "https://services7.integrify.com/files/instancelist/1504168b-47f2-43c5-8650-94fadd4dd8ee"

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
} 

getCSV();


const convertCSV = () => {
    // use npm package to convert csv import file to a JSON format
    const converter = csv()
    .fromFile('./data.csv')
    .then((json)=>{
        console.log(json);
    })
}
// convertCSV()

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
