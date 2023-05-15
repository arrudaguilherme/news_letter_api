const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https")


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")   //sends the sign up html file passing by the backend
});

app.post("/",(req,res)=>{
    const firsName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firsName,
                    LNAME: lastName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data)


        const options = {
            method : "POST",
            auth: "guilherme1:f935bc53725b8355aaf522682ba6a526-us21"
        }

        const url = 'https://us21.api.mailchimp.com/3.0/11014';

        const request =  https.request(url, options,()=>{
            express.response.on("data", ()=>{
                console.log(JSON.parse(data));
            })
        });

        request.write(jsonData);
        request.end();
});
app.listen(process.env.PORT || 3000, () =>{
    console.log("Server up and running")
});


//api key f935bc53725b8355aaf522682ba6a526-us21
// list id 11014

