// This is a sudo code mock up of what my function is going to do

// Import dependencies
// import AWS
// import Node Libraries
const fetch = require('node-fetch');
const csv = require('csvtojson');
const parser = require('csv-parser');

const getAccessToken = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    //const url = $site + 'access/impresonate 
      
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
// getAccessToken();


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

// getExistingingUsers()

const convertCSV = () => {
    // use npm package to convert csv import file to a JSON format
    const converter = csv()
    .fromFile('./data.csv')
    .then((json)=>{
        console.log(json);
    })
}

convertCSV()

const compareJSON = () => {
    //takes usersimport json from csv and existinguser json and runs a comparison by username
    //map each entry by user name
    //add new users to one array (user name does not already exists)
    //add existing users to another array (username exists already)
}

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