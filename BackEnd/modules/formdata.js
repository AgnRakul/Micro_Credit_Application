const { MongoClient } = require("mongodb");
const mongoDbUrl = "mongodb+srv://MonkAno:MonkAno@cluster0.cfvup.mongodb.net/CreditApplication?retryWrites=true&w=majority";

exports.FormData = function (req, res) {

    let emaildata = req.query.useremail;
    let fullName = req.query.FullName;
    let age = parseInt(req.query.userAge);
    let address = req.query.Address;
    let pan_No = req.query.Pan_No;
    let currentCompany = req.query.CurrentCompany;
    let currentSalary = parseInt(req.query.CurrentSalary);
    let previousSalary = parseInt(req.query.PreviousSalary);
    let ownHouse = parseInt(req.query.OwnHouse);
    let rentedHouse = req.query.RentedHouse;
    let rentedAmount = parseInt(req.query.RentedAmount);
    let groceryExpenese = parseInt(req.query.GroceryExpenese);
    let currentEmi = parseInt(req.query.CurrentEmi);
    let previousHike = parseInt(req.query.PreviousHike);
    let upcomingHike = parseInt(req.query.UpcomingHike);
    let bankName = req.query.BankName;

    let CustomerData = {

        "Full_Name": fullName,
        "Age": age,
        "Address": address,
        "Pan_No": pan_No,
        "Current_Company": currentCompany,
        "Current_Salary": currentSalary,
        "Previous_Salary": previousSalary,
        "Own_House": ownHouse,
        "Rented_House": rentedHouse,
        "Rented_Amount": rentedAmount,
        "GroceryExpenese": groceryExpenese,
        "Current_Emi": currentEmi,
        "Previous_Hike": previousHike,
        "Upcoming_Hike": upcomingHike,
        "Bank_Name": bankName,
        "Email": emaildata,


    }

    async function CustomerDetails(client, customerDetails, response) {

        const result = await client
            .db("Credit")
            .collection("UserDetails")
            .insertOne(customerDetails);

        if (result.acknowledged === true) {
            await client.close();
            console.log("Data Inserted");
            if (previousSalary === 0) {
                let UserCriteria = [];
                let Eligibility = 0;

                // Methods
                let CriteriaCheck = {

                    RentCheck: function (rent) {

                        if (rent <= 10000 && rent == 0) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    GroceryCheck: function (grocery) {

                        if (grocery <= 5000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    UpComingHikeCheck: function (upcomingHike) {

                        if (upcomingHike >= 1 && upcomingHike <= 12) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }

                    },
                    PreviousHikeCheck: function (previousHike) {
                        if (previousHike >= 5000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    OwnHouseCheck: function (ownHouse) {

                        if (ownHouse == 1) {
                            UserCriteria.push(1);
                            return 1;
                        } else {
                            UserCriteria.push(0);
                            return 0;
                        }
                    },
                    SalaryCheck: function (salary) {

                        if (salary >= 20000 || salary >= 18000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    }

                }


                let CoreEligibleForFresher = 0;

                // Common Eligibility
                if (previousSalary == 0) {
                    // For Fresher
                    if (age >= 24) {


                        if (currentSalary >= 20000) {
                            CoreEligibleForFresher = CoreEligibleForFresher + 1;
                            Eligibility = 1;

                        } else {
                            console.log("Not-Eligible for loan -1");
                            response.send(
                                "<script>alert('Not eligible'); window.history.go(-1); </script>"
                            );

                            Eligibility = 0;

                        }

                    } else {
                        console.log("Not-Eligible for loan -2");
                        response.send(
                            "<script>alert('Not Eligible'); window.history.go(-1); </script>"
                        );
                        Eligibility = 0;

                    }

                }


                // Core Eligibility
                function ProbabilityOne() {
                    if (CoreEligibleForFresher == 1) {

                        CriteriaCheck.RentCheck(rentedAmount);
                        CriteriaCheck.GroceryCheck(groceryExpenese);
                        CriteriaCheck.UpComingHikeCheck(upcomingHike);
                        CriteriaCheck.PreviousHikeCheck(previousHike);
                        CriteriaCheck.OwnHouseCheck(ownHouse);
                        CriteriaCheck.SalaryCheck(currentSalary);


                        let CriteriaFlag = 0;

                        for (i = 0; i <= UserCriteria.length; i++) {

                            if (UserCriteria[i] == 1) {
                                CriteriaFlag = CriteriaFlag + 1;
                            }


                        }
                        if (CriteriaFlag >= 3) {
                            let percentage = 0;
                            // console.log("Eligible for Loan");
                            Eligibility = 1;
                            if (CriteriaCheck.SalaryCheck(currentSalary) >= 40000) {
                                percentage = Math.random() * (35 - 40) + 40;
                            } else {
                                percentage = Math.random() * (27 - 30) + 30;
                            }
                            if (CriteriaCheck.OwnHouseCheck(ownHouse)) {
                                percentage = Math.random() * (35 - 40) + 40;
                            } else {
                                percentage = Math.random() * (27 - 30) + 30;
                            }
                            let ExpectedLoanAmount = Math.round(((currentSalary * 12) * percentage) / 100);
                            // console.log(ExpectedLoanAmount);

                            function OwnHouseOfPercentageRange() {
                                if (Math.round(parseInt(percentage)) < 30) {
                                    return 2;
                                }
                                else {
                                    return 1;
                                }
                            }

                            return {
                                Percentage: percentage,
                                Probability: 1,
                                Condition: OwnHouseOfPercentageRange(),
                                LoanAmount: ExpectedLoanAmount,
                                rateOfInterest: 12.5,
                            }

                        } else {
                            console.log("Not Eligible for Loan - 3");
                            response.send(
                                "<script>alert('Not eligible '); window.history.go(-1); </script>"
                            );
                            Eligibility = 0;

                        }

                    }

                }

                try {

                    if (Eligibility == 1) {


                        function EmiCalculationForMonth() {

                            let LoanDetails = ProbabilityOne();
                            let LoanAmount = LoanDetails.LoanAmount;
                            let Interest = LoanDetails.rateOfInterest;
                            let InterestConversion = parseFloat(((Interest / 12) / 100).toFixed(5));
                            let Months = [36, 60, 84];
                            let InterestConversionFinal = parseFloat((1 + parseFloat(InterestConversion)).toFixed(5));

                            let confirmedData = [];


                            Months.forEach(i => {
                                let EmiAmount = LoanAmount * InterestConversion * (Math.pow(InterestConversionFinal, i)) / (Math.pow(InterestConversionFinal, i) - 1);
                                // console.log();
                                let totalPay = Math.round(EmiAmount) * i;
                                let TotalInterest = totalPay - LoanAmount;
                                // res.send("Sum Calculation");
                                console.log(`Percentage: ${LoanDetails.Percentage} Total Pay = ${totalPay} - Loan Amount = ${LoanAmount} = Total Interest = ${TotalInterest} / Total Emi ${Math.round(EmiAmount)} Per Month Period = ${i} Months`);

                                confirmedData.push({


                                    LoanAmount: LoanAmount,
                                    TotalInterest: TotalInterest,
                                    TotalPay: Math.round(totalPay),
                                    MonthlyEmi: Math.round(EmiAmount),
                                    Months: i,
                                    InterestRate: Interest,


                                });

                                console.log(confirmedData);
                            });
                            // res.json(
                            //     data = {
                            //         confirmedData
                            //     }
                            // )
                            async function insert() {
                                await client.connect();
                                const inset = await client
                                    .db("Credit")
                                    .collection("emiDetails")
                                    .insertOne({
                                        user: emaildata,
                                        data: confirmedData
                                    });
                            }
                            insert();
                            response.send(
                                "<script>alert('Data is Calculating Please Wait'); window.location.href = 'http://127.0.0.1:5500/FrontEnd/display.html'; </script>"
                            );

                        }
                        EmiCalculationForMonth();
                    }

                } catch (error) {

                    console.log("Not Eligible for Loan");
                    response.send(
                        "<script>alert('Not eligible'); window.history.go(-1); </script>"
                    );
                }

            } else {
                let UserCriteria = [];
                // Methods
                let CriteriaCheck = {

                    AgeCheck: function (age) {

                        if (age >= 24 && age <= 50) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    ExperienceCheck: function (experience) {

                        if (experience >= 2) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    SalaryCheck: function (salary) {

                        if (salary >= 40000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    PreviousSalaryCheck: function (salary) {

                        if (salary >= 20000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    OwnHouseCheck: function (ownHouse) {

                        if (ownHouse == 1) {
                            UserCriteria.push(1);
                            return 1;
                        } else {
                            UserCriteria.push(0);
                            return 0;
                        }
                    },
                    RentCheck: function (rent) {

                        if (rent <= 13000 && rent == 0) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    GroceryCheck: function (grocery) {

                        if (grocery <= 7000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    CurrentEmiCheck: function (currentEmi) {

                        if (currentEmi == 1) {
                            UserCriteria.push(1);
                            return 1;
                        } else {
                            UserCriteria.push(0);
                            return 0;
                        }
                    },
                    PreviousHikeCheck: function (previousHike) {
                        if (previousHike >= 5000) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }
                    },
                    UpComingHikeCheck: function (upcomingHike) {

                        if (upcomingHike >= 1 && upcomingHike <= 12) {
                            return UserCriteria.push(1);
                        } else {
                            return UserCriteria.push(0);
                        }

                    },
                }


                let CoreEligibleForExperience = 0;


                // Common Eligibility
                if (previousSalary > 1) {
                    // For Experience
                    if (age >= 24 && age <= 50) {

                        if (currentSalary >= 40000) {
                            CoreEligibleForExperience = CoreEligibleForExperience + 1;
                        } else {
                            // console.log("Not-Eligible for loan -1");
                        }

                    } else {
                        // console.log("Not-Eligible for loan -2");

                    }

                }

                // Core Eligibility
                function ProbabilityTwo() {

                    if (CoreEligibleForExperience == 1) {

                        CriteriaCheck.PreviousSalaryCheck(previousSalary); // Optional
                        CriteriaCheck.OwnHouseCheck(ownHouse) // If Available Percentage Will be Differ (Percentage will be 35% to 40%)
                        CriteriaCheck.RentCheck(rentedAmount) // If Available Percentage will differ
                        CriteriaCheck.GroceryCheck(groceryExpenese) // Required to Match Criteria if not Grocery No Problem
                        CriteriaCheck.CurrentEmiCheck(currentEmi) // if No Current Emi Percentage Will be 30% to 35% Loan Amount or 25% to 27% 
                        CriteriaCheck.PreviousHikeCheck(previousHike) // Required to Match Criteria but Optional
                        CriteriaCheck.UpComingHikeCheck(upcomingHike) // Must in Between 6 to 12 months


                        let CriteriaFlag = 0;

                        for (i = 0; i <= UserCriteria.length; i++) {

                            if (UserCriteria[i] == 1) {
                                CriteriaFlag = CriteriaFlag + 1;
                                // console.log(CriteriaFlag);
                            }


                        }
                        if (CriteriaFlag >= 3) {
                            let percentage = 0;

                            if (CriteriaCheck.OwnHouseCheck(ownHouse) && CriteriaCheck.GroceryCheck(groceryExpenese) && CriteriaCheck.UpComingHikeCheck(previousHike && CriteriaCheck.SalaryCheck(currentSalary) >= 40000)) {

                                percentage = Math.random() * (38 - 44) + 44;

                            } else {

                                if (CriteriaCheck.CurrentEmiCheck(currentEmi) && CriteriaCheck.GroceryCheck(groceryExpenese) && CriteriaCheck.UpComingHikeCheck(previousHike)) {

                                    percentage = Math.random() * (27 - 32) + 32;
                                } else {
                                    percentage = Math.random() * (33 - 37) + 37;
                                }
                            }

                            let ExpectedLoanAmount = Math.round(((currentSalary * 12) * percentage) / 100);
                            // console.log(ExpectedLoanAmount);

                            function OwnHouseOfPercentageRange() {
                                if (Math.round(parseInt(percentage)) < 30) {
                                    return 1;
                                }
                                else {
                                    return 2;
                                }
                            }

                            let returnObj = {
                                Percentage: percentage,
                                Probability: 2,
                                Condition: OwnHouseOfPercentageRange(),
                                LoanAmount: ExpectedLoanAmount,
                                rateOfInterest: 9.5,
                            }
                            // console.log(returnObj);
                            return returnObj;
                        }


                    }


                }

                // Emi Calculation
                try {

                    function EmiCalculationForMonth() {

                        let LoanDetails = ProbabilityTwo();
                        ProbabilityTwo(LoanDetails);
                        let LoanAmount = LoanDetails.LoanAmount;
                        let Interest = LoanDetails.rateOfInterest;
                        let InterestConversion = parseFloat(((Interest / 12) / 100).toFixed(5));
                        let Months = [36, 60, 84];
                        let InterestConversionFinal = parseFloat((1 + parseFloat(InterestConversion)).toFixed(5));
                        let confirmedData = [];

                        Months.forEach(i => {
                            let EmiAmount = LoanAmount * InterestConversion * (Math.pow(InterestConversionFinal, i)) / (Math.pow(InterestConversionFinal, i) - 1);
                            // console.log();
                            let totalPay = Math.round(EmiAmount) * i;
                            let TotalInterest = totalPay - LoanAmount;
                            console.log(`Percentage: ${LoanDetails.Percentage} Total Pay = ${totalPay} - Total Interest = ${TotalInterest} - Total Emi ${Math.round(EmiAmount)} Period = ${i} Months`);


                            confirmedData.push({

                                LoanAmount: LoanAmount,
                                TotalInterest: TotalInterest,
                                TotalPay: Math.round(totalPay),
                                MonthlyEmi: Math.round(EmiAmount),
                                Months: i,
                                InterestRate: Interest,

                            })

                        });

                        async function insert() {
                            await client.connect();
                            const inset = await client
                                .db("Credit")
                                .collection("emiDetails")
                                .insertOne({
                                    user: emaildata,
                                    data: confirmedData
                                });
                        }
                        insert();
                        response.send(
                            "<script>alert('Data is Calculating Please Wait'); window.location.href = 'http://127.0.0.1:5500/FrontEnd/display.html'; </script>"
                        );


                    }
                    EmiCalculationForMonth();

                } catch (error) {

                    console.log("Not Eligibility")
                    response.send(
                        "<script>alert('Not Eligible for Loan'); window.history.go(-1); </script>"
                    );
                }


            }

        } else {
            console.log("Data Not Inserted");
        }

    };


    async function main() {
        const uri = mongoDbUrl;
        const client = new MongoClient(uri);


        try {
            await client.connect();
            const pen = await CustomerDetails(client, CustomerData, res);
        } catch (e) {
            console.log("Testing");
            console.error(e);
        } finally {
            await client.close();
        }
    }
    main().catch(console.error);

}