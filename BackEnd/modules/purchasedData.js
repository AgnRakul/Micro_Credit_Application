const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";


// Purchased Data will Be Fetced From Db and it will Show to ViewPurhcase.html
exports.purchasedData = function (req, res) {


    console.log(req.query);

    let user = req.query._Email;
    async function display(client, res) {

        const PurchasedDataFinder = await client.db("Credit").collection("PurchasedData").find({ "UserName": user });
        const ConvertToArray = await PurchasedDataFinder.toArray();
        console.log(ConvertToArray);
        res.json(ConvertToArray)
    }





    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await display(client, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);


}