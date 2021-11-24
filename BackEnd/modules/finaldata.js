const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";


// Loan Related Detials to Fetched to Html
exports.finaldata = function (req, res) {


    let Email = req.query._Email;
    console.log(Email);


    async function final(client) {

        const findUserMail = await client.db('Credit').collection('emiDetails').find({
            "user": Email
        });
        const ConvertToArray = await findUserMail.toArray();
        console.log(ConvertToArray.length);
        let dataToDisplay = ConvertToArray[ConvertToArray.length - 1]

        if (ConvertToArray.length == 0) {
            res.json({
                status: 0
            })
        }
        else {
            res.json(dataToDisplay)
        }

    }


    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await final(client, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);


}