//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var first = req.body.fn;
  var last = req.body.ln;
  var email = req.body.mail;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: first,
        LNAME: last
      }
    }]
  };
  var jsondata = JSON.stringify(data);

  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/4cec671b8b",
    method: "POST",
    headers: {
      "Authorization": "Aravindh1 0421b25bc65835b325b2933028d16b44-us18"
    },
    body: jsondata
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname+"failure.html");
    }
    else if(response.statusCode==200)
      {
            res.sendFile(__dirname+"/success.html");
      }
      else {
        {
          res.sendFile(__dirname+"/failure.html");
        }
      }
  });
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000");
});
//0421b25bc65835b325b2933028d16b44-us18
