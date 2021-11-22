const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";


exports.SignUp = function (req, res) {
    let Email = req.query.Email;
    let PhoneNo = req.query.PhoneNo;
    let Registration = {

        "Email_Id": Email,
        "Phone_No": PhoneNo,
    };


    async function SignUp(client, newListing, response) {
        const ExistingAccount = await client.db("Credit").collection("UserSignUp").find({ "Email_Id": { $in: [Email] } });
        const ConvertToArray = await ExistingAccount.toArray();
        console.log(ConvertToArray);


        if (ConvertToArray.length >= 1) {
            res.json(
                {
                    "Status": 0,
                    "MSG": "Exist User",
                }
            )
        } else {

            const result = await client
                .db("Credit")
                .collection("UserSignUp")
                .insertOne(Registration);

            if (result.acknowledged === true) {
                res.json(
                    {
                        "Status": 1,
                        "MSG": "New User Created",
                    }
                )
            } else {
                console.log("Data Not Inserted");

            }
        }


    };


    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await SignUp(client, Registration, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}