var integrifyLambda = require('integrify-aws-lambda');
var request = require("request");

var config = {
    helpUrl: "http://www.integrify.com",
    inputs: [
        {key:"requestSid", type:"string"},
        {key:"file", type:"file"}],
    outputs:[{key:"successMessage", type:"string"}]
  }

  const exec = (event, context, callback) => {
    
    console.log(event);
    

    request.get(event.integrifyServiceUrl + '/files/instancelist/' + event.inputs.requestSid, {'auth': {
        'bearer': event.inputs.accessToken || event.accessToken
    }}, function (err, httpResponse, body) {

        let integrifyFiles = JSON.parse(body);
        if (err || integrifyFiles.length == 0) {
            console.error(err || "no files found" );
            return callback(err || "no files found");
        }

        let integrifyFile = integrifyFiles.sort(function(a,b) {
            return new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime()
        }).find(f => f.FileName == event.inputs.file);

        if (!integrifyFile) {
            let em = "no matching file for this request";
            console.error(em);
            return callback(em)
        }
    }
)};

config.execute = exec;

let userImport = new IntegrifyLambda(config);

exports.handler = userImport.handler;