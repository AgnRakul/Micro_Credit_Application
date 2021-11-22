let express = require("express");
var cors = require("cors");
const app = express();
let SignUpModule = require('./modules/signUp');
let SignInModule = require('./modules/signIn');
let CustomerFormData = require('./modules/formdata')
let finalData = require('./modules/finaldata');


app.get('/SignUp', cors(), (req, res) => {

    SignUpModule.SignUp(req, res)

    // res.send("Hello World");
})

app.get('/SignIn', cors(), (req, res) => {

    SignInModule.SignIn(req, res)
})

app.get('/SubmitFormData', cors(), (req, res) => {

    CustomerFormData.FormData(req, res)

})

app.get('/showDetails', cors(), (req, res) => {

    finalData.finaldata(req, res);
})

const port = 9999;
app.listen(port, () => console.log(`Listening on port ${port}..`));