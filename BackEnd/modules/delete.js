const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";


// Function to Delete Purchased Loan
exports.deleteLoan = function (req, res) {


    let Email = req.query.emailbox;
    let id = req.query.monthbox;
    console.log(req.query);


    async function final(client) {

        const findUserMail = await client.db('Credit').collection('PurchasedData').deleteOne({
            "id": id
        });

        if (findUserMail.deletedCount == 1) {
            res.send(
                "<script>alert('Loan canceled'); window.location.href = 'http://127.0.0.1:5500/FrontEnd/ViewPurchase.html'; </script>"
            );
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