let express = require("express");
var cors = require("cors");
const app = express();
let SignUpModule = require('./modules/signUp');
let SignInModule = require('./modules/signIn');
let CustomerFormData = require('./modules/formdata')
let finalData = require('./modules/finaldata');
let purchase = require('./modules/purchase');
let purchasedData = require('./modules/purchasedData');
let deleteing = require('./modules/delete')
app.get('/SignUp', cors(), (req, res) => {

    SignUpModule.SignUp(req, res)


})

app.get('/SignIn', cors(), (req, res) => {

    SignInModule.SignIn(req, res)
})

app.get('/SubmitFormData', cors(), (req, res) => {

    CustomerFormData.FormData(req, res)

})

app.get('/showDetails', cors(), (req, res) => {

    finalData.finaldata(req, res);
});

app.get('/purchaseNow', cors(), (req, res) => {

    purchase.purchase(req, res);

})

app.get('/showpurchase', cors(), (req, res) => {

    purchasedData.purchasedData(req, res);
})

app.get('/cancel',cors(),(req,res)=>{

deleteing.deleteLoan(req,res);
})

const port = 9999;
app.listen(port, () => console.log(`Listening on port ${port}..`));