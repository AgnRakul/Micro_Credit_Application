const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";

exports.SignIn = function (req, res) {

    let Email = req.query._Email;
    let PhoneNo = req.query._PhoneNo;

    console.log(Email);
    console.log(PhoneNo);
    async function SignIn(client) {

        const ExistingAccount = await client.db("Credit").collection("UserSignUp").find({ "Email_Id": Email });
        const ConvertToArray = await ExistingAccount.toArray();
        console.log(ConvertToArray.length);
        if (ConvertToArray.length == 1) {
            if (ConvertToArray[0].Phone_No == PhoneNo) {


                res.json(
                    {
                        "Status": 1,
                        "MSG": "Auth User",
                    }
                )
            }
        } else {

            res.json(
                {
                    "Status": 0,
                    "MSG": "Un-Auth User",
                }
            )

        }


    };


    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await SignIn(client, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}