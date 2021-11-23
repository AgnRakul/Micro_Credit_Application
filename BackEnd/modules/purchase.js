const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";

exports.purchase = function (req, res) {

    let email = req.query.emailbox;
    let month = req.query.monthbox;

    console.log(email, month);



    async function SignUp(client, response) {
        const ExistingAccount = await client.db("Credit").collection("emiDetails").find({ "user": { $in: [email] } });
        const ConvertToArray = await ExistingAccount.toArray();




        for (let i = 0; i < ConvertToArray[0].data.length; i++) {


            if (ConvertToArray[0].data[i].Months == month) {


                let purchase = {

                    UserName: email,
                    LoanAmount: ConvertToArray[0].data[i].LoanAmount,
                    TotalInterest: ConvertToArray[0].data[i].TotalInterest,
                    TotalPay: ConvertToArray[0].data[i].TotalPay,
                    MonthlyEMI: ConvertToArray[0].data[i].MonthlyEmi,
                    InterestRate: ConvertToArray[0].data[i].InterestRate,

                }

                const result = await client
                    .db("Credit")
                    .collection("PurchasedData")
                    .insertOne(purchase);

                if (result.acknowledged === true) {
                    response.send(
                        "<script>alert('Purchased Successfully'); window.history.go(-1); </script>"
                    );
                } else {
                    response.send(
                        "<script>alert('Internal Server Error'); window.history.go(-1); </script>"
                    );

                }

            }

        }

    };


    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await SignUp(client, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}