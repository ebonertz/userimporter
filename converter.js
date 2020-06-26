const csv=require('csvtojson');

// Invoking csv returns a promise
const converter = csv()
.fromFile('./data.csv')
.then((json)=>{
    console.log(json);
})

