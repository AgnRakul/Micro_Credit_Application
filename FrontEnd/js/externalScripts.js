function login() {
    let Email = document.getElementById("_email").value;
    let phoneNo = document.getElementById("_pass").value;
    console.log(typeof (Email.length));
    if (Email.length == 0 || phoneNo.length == 0) {
        alert("Fill the data");

    }

    let httpRequestForLogin = new XMLHttpRequest();
    httpRequestForLogin.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);

            let confirmation = JSON.parse(this.response);
            if (confirmation.Status == 1) {
                alert("Welcome");
                document.cookie = "user" + "=" + Email + ";" + ";path=/";
                window.location.href = "http://127.0.0.1:5500/FrontEnd/FormScreen.html";
            } else {
                alert("User or Password is InCorrect");

            }
        }
    };

    httpRequestForLogin.open("GET", "http://localhost:9999/SignIn?_Email=" + Email + "&_PhoneNo=" + phoneNo, true);
    httpRequestForLogin.send();
}

function signup() {

    let Email = document.getElementById("email").value;
    let phoneNo = document.getElementById("pass").value;

    if (Email.length == 0 || phoneNo.length == 0) {
        alert("Fill the data");

    }
    else {
        document.cookie = "user" + "=" + Email + ";" + ";path=/";
    }
    let httpRequestForSignUp = new XMLHttpRequest();
    httpRequestForSignUp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let signedUp = JSON.parse(this.response);
            if (signedUp.Status == 0) {
                alert("Existing User")
            } else {
                window.location.href = "http://127.0.0.1:5500/FrontEnd/FormScreen.html";
                alert("New User Created")

            }
        }
    };

    httpRequestForSignUp.open("GET", "http://localhost:9999/SignUp?Email=" + Email + "&PhoneNo=" + phoneNo, true);
    httpRequestForSignUp.send();

}

function finduseremail() {

    let mailbox = document.getElementById('useremail');
    let useremail = document.cookie;
    let email = useremail.split("=");
    mailbox.value = email[1];
    console.log(email[1]);

}

function hide() {
    let elm = document.getElementById("useremail");
    elm.style.display = "none";
}


function findData() {

    let dbData = document.cookie;
    let email = dbData.split("=");




    if (email[1] == '' || email[0] == '') {
        window.location.href = "http://127.0.0.1:5500/FrontEnd/";
    }
    let httpRequestForData = new XMLHttpRequest();
    httpRequestForData.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            let da = JSON.parse(this.response);
            console.log(typeof (da));
            console.log(da.data);


            function Card(emi, month, totalPay, interest, loanAmount) {

                let box = document.querySelector('.box');

                let Card = document.createElement('div')
                Card.className = 'EmiCard';
                box.appendChild(Card);

                let form = document.createElement('form');
                form.className = "purchasedata";
                form.setAttribute('Method', 'GET');
                form.setAttribute('action', 'http://localhost:9999/purchaseNow');
                Card.appendChild(form);

                let emailtxtbox = document.createElement('INPUT');
                emailtxtbox.setAttribute('name', 'emailbox');
                emailtxtbox.value = email[1];
                emailtxtbox.style.display = 'none';
                form.appendChild(emailtxtbox);


                let monthbox = document.createElement('INPUT');
                monthbox.setAttribute('name', 'monthbox');
                monthbox.value = month;
                monthbox.style.display = 'none';
                form.appendChild(monthbox);

                let Emi = document.createElement('h5');
                Emi.className = "Emi";
                Emi.id = "Emi";
                Emi.innerHTML = "EMI";
                form.appendChild(Emi);

                let EmiAmountMonthly = document.createElement('h6');
                EmiAmountMonthly.className = "EmiAmountMonthly";
                EmiAmountMonthly.id = "EmiAmountMonthly";
                EmiAmountMonthly.innerHTML = `EMI: &#8377; ${emi}`;
                form.appendChild(EmiAmountMonthly);

                let EmiMonth = document.createElement('p');
                EmiMonth.className = "EmiMonth";
                EmiMonth.id = "EmiMonth";
                EmiMonth.innerHTML = `Months: ${month}`;
                form.appendChild(EmiMonth);

                let LoanAmount = document.createElement('p');
                LoanAmount.className = "LoanAmt";
                LoanAmount.id = "LoanAmt";
                LoanAmount.innerHTML = `Loan Amount <br> &#8377; ${loanAmount}`;
                form.appendChild(LoanAmount);


                let hrTag = document.createElement('hr');
                form.appendChild(hrTag);

                let minDiv = document.createElement('div');
                minDiv.className = "min";
                form.appendChild(minDiv);

                let TotalPaymentHeading = document.createElement('h6');
                minDiv.appendChild(TotalPaymentHeading);


                let TotalInterestRate = document.createElement('p');
                TotalInterestRate.className = "TotalIntRate";
                TotalInterestRate.id = "TotalIntRate";
                TotalInterestRate.innerHTML = `Total Interest <br> &#8377; ${interest}`;
                minDiv.appendChild(TotalInterestRate);

                let TotalPayment = document.createElement('p');
                TotalPayment.className = "TotalPay";
                TotalPayment.id = "TotalPay";
                TotalPayment.innerHTML = `Total Payment <br> &#8377; ${totalPay}`;
                minDiv.appendChild(TotalPayment);



                let progressDiv = document.createElement('div');
                progressDiv.className = "progress";
                minDiv.appendChild(progressDiv);

                let progressBarEnd = document.createElement('div');
                progressBarEnd.className = "progress-bar bg-success";
                progressBarEnd.setAttribute('role', 'progressbar');
                progressBarEnd.setAttribute('aria-valuenow', '30');
                progressBarEnd.setAttribute('aria-valuemin', '0');
                progressBarEnd.setAttribute('aria-valuemax', '100');
                progressBarEnd.id = "intrest";
                progressBarEnd.style.width = `${interest}%`;
                progressDiv.appendChild(progressBarEnd);

                let progressBar = document.createElement('div');
                progressBar.className = "progress-bar";
                progressBar.setAttribute('role', 'progressbar');
                progressBar.id = "loanAmount";
                progressBar.setAttribute('aria-valuenow', '15');
                progressBar.setAttribute('aria-valuemin', '0');
                progressBar.setAttribute('aria-valuemax', '100');
                // progressBar.setAttribute = " aria-valuemin='0' aria-valuemax='100'";
                progressBar.style.width = `${totalPay}%`;
                progressDiv.appendChild(progressBar);


                let purchaseLoan = document.createElement("INPUT");
                purchaseLoan.setAttribute("type", "submit");
                purchaseLoan.className = "Purchase";
                purchaseLoan.id = "Purchase";
                purchaseLoan.value = "Purchase Now";
                form.appendChild(purchaseLoan);



            }
            // console.log(da[0].data.length);

            for (let i = 0; i < da.data.length; i++) {

                let Amount = da.data[i].LoanAmount;
                console.log(Amount);
                let Interest = da.data[i].TotalInterest;
                console.log(Interest);
                let totaltranc = da.data[i].TotalPay;
                console.log(totaltranc);

                let monthemi = da.data[i].MonthlyEmi;
                console.log(monthemi);

                let mon = da.data[i].Months;
                console.log(mon);

                Card(monthemi, mon, totaltranc, Interest, Amount)

                let intRate = da.data[i].InterestRate;
                console.log(intRate);



            }





        }
    };

    httpRequestForData.open("GET", "http://localhost:9999/showDetails?_Email=" + email[1], true);
    httpRequestForData.send();

}

function logOut() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("welcome Back");
    window.location.href = "http://127.0.0.1:5500/FrontEnd/";
}


function ShowMyPurchase() {

    let dbData = document.cookie;
    let email = dbData.split("=");

    alert("fuvk")
    console.log(email[1]);


    if (email[1] == '' || email[0] == '') {
        window.location.href = "http://127.0.0.1:5500/FrontEnd/";
    }

    let httpRequestForSignUp = new XMLHttpRequest();
    httpRequestForSignUp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);

        }
    };

    httpRequestForSignUp.open("GET", "http://localhost:9999/showpurchase?_Email=" + email[1], true);
    httpRequestForSignUp.send();

}