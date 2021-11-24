// All pre Check
/* First Creteria
1. New Employee Minimum Age for Applying Loan Should Be 25 Years - Must 1
2. Working Experiance Atleast 2 Years - Submit One Year Salary Data - Must 1
3. Minimum Salary Should Be 20000Rs. - Must 1
4. Maximum House Rent Should Be 7000 - 10000Rs.. - Not Must 1
5. Grocery Expenses 3000 - 5000Rs. - Not Must 1
6.  Upcoming Hike Should be in minimum period of 6 Month to 12 Months  - Must 1
7. Previous Hike Should be Minimum 5000Rs - not-Must 1
8. if No Previous Hike but Own House Must be Available
*/
//     0           1             2           3         4             5                  6                 7
// [ageCheck,experianceCheck,salaryCheck,rentCheck,groceryCheck,upcomingHikeCheck,previousHikeCheck,ownHouseCheck];

// let confirmation = [];

// let Userage = 24;
// let Userexperiance = 2;
// let UserSalary = 20000;
// let UserRent = 10000;
// let UserGrocery = 6000;
// let UserupcomingHike = 12;
// let UserpreviousHike = 5000;
// let UserOwnHouse = 1;

// // Age Check
// let ageCheck = function (age) {

//     if (age >= 24) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // Minimum working experiance Check
// let experianceCheck = function (experiance) {

//     if (experiance >= 2 || experiance >= 1.5) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // Salary Check
// let salaryCheck = function (salary) {

//     if (salary >= 20000 || salary >= 18000) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // House Rent Check
// let rentCheck = function (rent) {

//     if (rent <= 10000) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // Grocery Check
// let groceryCheck = function (grocery) {

//     if (grocery <= 5000) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // upcoming hike check
// let upcomingHikeCheck = function (upcomingHike) {

//     if (upcomingHike >= 1 && upcomingHike <= 12) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }

// }
// // previous hike check
// let previousHikeCheck = function (previousHike) {
//     if (previousHike >= 5000) {
//         return confirmation.push(1);
//     } else {
//         return confirmation.push(0);
//     }
// }
// // previous Hike and Own House
// let ownHouseCheck = function (ownhouse) {

//     if (ownhouse == 1) {
//         confirmation.push(1);
//         return 1;
//     } else {
//         confirmation.push(0);
//         return 0;
//     }
// }

// // let count = 0;
// // for (i = 0; i < confirmation.length; i++) {

// //     if (confirmation[i] == 1) {
// //         count = count + 1;
// //     }

// // }

// let methods = {

//     FresherDrive_PossibilityOne: function POSSIBILITY_1() {
//         salaryCheck(UserSalary);
//         groceryCheck(UserGrocery);
//         upcomingHikeCheck(UserupcomingHike);
//         // ownHouseCheck(1);
//         let count = 0;
//         console.log("For Fresher");
//         for (i = 0; i < confirmation.length; i++) {
//             if (confirmation[i] == 1) {
//                 count = count + 1;
//             }
//         }
//         if (count >= 2) {
//             console.log("Loan Creteria Matched");
//             let percentage = Math.random() * (27 - 30) + 30;
//             let calculation = Math.round(((UserSalary * 12) * percentage) / 100);

//             return {
//                 POSSIBILITY: 1,
//                 LoanAmount: calculation,
//                 rateofInterest: 12.5,
//             }

//         } else {
//             console.log("Loan Creteria Un Matched"); return 0;
//         }
//     },
//     FresherDrive_PossibilityThree: function POSSIBILITY_3() {
//         salaryCheck(UserSalary)
//         upcomingHikeCheck(UserupcomingHike);
//         groceryCheck(UserGrocery)
//         console.log(ownHouseCheck(UserOwnHouse));
//         rentCheck(UserRent)

//         let count = 0;
//         for (i = 0; i < confirmation.length; i++) {
//             if (confirmation[i] == 1) {
//                 count = count + 1;
//             }
//         }
//         if (count >= 3) {
//             console.log("Loan Creteria Matched");
//             let percentage;
//             if (ownHouseCheck(UserOwnHouse)) {
//                 percentage = Math.random() * (35 - 40) + 40;
//             } else {
//                 percentage = Math.random() * (27 - 30) + 30;
//             }



//             let calculation = Math.round(((UserSalary * 12) * percentage) / 100);
//             function condition() {
//                 if (Math.round(parseInt(percentage)) < 30) {
//                     return 2;
//                 }
//                 else {
//                     return 1;
//                 }
//             }
//             return {
//                 Percentage: percentage,
//                 POSSIBILITY: 3,
//                 Condition: condition(),

//                 LoanAmount: calculation,
//                 rateofInterest: 12.5,
//             }
//             // console.log(Math.round(calculation));

//         } else {
//             console.log("Loan Creteria Not Matched"); return 0;
//         }

//     }

// }

// function emi() {

//     if (UserSalary >= 40000) {
//         let loanAmount1 = methods.FresherDrive_PossibilityOne();
//         console.log(loanAmount1);
//     }
//     if (UserSalary >= 20000 && UserSalary <= 39999) {


//         if (UserupcomingHike <= 12 && UserSalary >= 20000 && UserSalary <= 39999) {
//             let loanAmount3 = methods.FresherDrive_PossibilityThree();
//             console.log(loanAmount3);
//         }
//         else {
//             let loanAmount2 = methods.FresherDrive_PossibilityTwo();
//             console.log(loanAmount2);
//         }
//     }



//     function emiCalculation() {

//         let amount = loanAmount.LoanAmount; // return front end
//         console.log(`Loan Amount ${amount}`);
//         let rateofInterest = loanAmount.rateofInterest;
//         let perAnnum = ((rateofInterest / 12) / 100).toFixed(5);
//         console.log(`Rate of Interest ${perAnnum}`);
//         let month = 5 * 12;
//         let prr = (1 + parseFloat(perAnnum)).toFixed(5);


//         // console.log(i);
//         let emi = amount * perAnnum * (Math.pow(prr, month)) / (Math.pow(prr, month) - 1);
//         let totalAmountpayable = Math.round(emi) * month; // return front end
//         let totalInterst = totalAmountpayable - amount; // return front end
//         // let emi = Math.pow(1 + 0.00875, 120)
//         // / Math.pow(1 + perAnnum, month) - 1
//         console.log(`Total Intrest: Year(${totalInterst}) / Month(${(totalInterst / 60).toFixed(6)})`);
//         console.log(`Total Payable: Year(${totalAmountpayable}) / Month(${totalAmountpayable / 60})`);

//         let returnableobject = {
//             POSSIBILITY: 3,
//             payableLoanAmount: amount,
//             payableTotalInterst: totalInterst,
//             payableTotalFinalAmount: totalAmountpayable,
//         }
//         return returnableobject;

//     }
//     emiCalculation();

// }
// emi();



/*
Fresher  - POSSIBILITY 1
    Minimum 40000 (Must)
    Own House (Optional)
    Rent House (Optional)   -- Loan Eligibility 50% (Given Loan at 40%) random(35% to 40%) 12.5%
    Grocery (Must)
    Upcoming Hike (Must)
    Previous (Not Applicable)

    POSSIBILITY - 2
    Minimum 20000 (Must)
    Grocery (Must)
    Rent House (Optional) -- Loan Eligibility 50% (Given Loan at 30%) randon(27% to 30%) 12.5% if Own is Available then loan percentage(35 to 40%)
    Own House (Optional)
    Upcoming Hike (Must)
    Prevous Hike (Not Applicable)
*/



/*


No Idea How it Works .. Lets Give a Tryyyyyyy.

 First Step - VirtualPan Card (Generator with Random)
 Second Step - Name , Id (Random Number between 3000 to 6000)
 Third Step - Emi Transaction [{
     Loan Name
     Loan Amount
     Status: Completed , Progress , Pending
 }]












*/