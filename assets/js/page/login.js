function toggleResetPswd(){
    $('#logreg-forms .form-signin').toggle();
    $('#logreg-forms .form-reset').toggle();
}

function toggleSignUp(){
    $('#logreg-forms .form-signin').toggle();
    $('#logreg-forms .form-signup').toggle();
}

function toggleSignUp(){
    $('#logreg-forms .form-signin').toggle();
    $('#logreg-forms .form-signup-employe').toggle();
}

function toggleSignUpCompany(){
    $('#logreg-forms .form-signin').toggle();
    $('#logreg-forms .form-signup-company').toggle();
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup-employe').click(toggleSignUp);
    $('#logreg-forms #cancel_signup-employe').click(toggleSignUp);
    $('#logreg-forms #btn-signup-company').click(toggleSignUpCompany);
    $('#logreg-forms #cancel_signup-company').click(toggleSignUpCompany);
})

// == Phone Format ==
document.getElementById('phone-employe').addEventListener("keyup", function(){
    txt=this.value;
    if (txt.length==3 || txt.length==7 || txt.length==8)
        this.value=this.value+" ";
});

document.getElementById('contact-phone').addEventListener("keyup", function(){
    txt=this.value;
    if (txt.length==3 || txt.length==7 || txt.length==8)
        this.value=this.value+" ";
});

function signIn() {
    document.querySelector('#message').innerHTML = ""
    document.querySelector('#message').style.display = 'none'
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value

    if( email !== "" && password !== "" ) {

        var userData = {
            user_id: 1,
            login_as: 'company',
            user_feedback: false
        }
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);
        template();

        // const loginData = {
        //     email: email,
        //     password: password
        // }

        // $.ajax({
        //     url: 'http://localhost:8000/api/v1.0/login',
        //     headers: {
        //         'Content-Type':'application/json'
        //     },       
        //     method: 'POST',
        //     type: 'json',
        //     data: JSON.stringify(loginData),
        //     success: function (res) {
        //         if (res.error) {
        //             document.querySelector('#message').innerHTML += `${res.error}`
        //             document.querySelector('#message').style.display = 'block'
        //         } else {
        //             localStorage.setItem('userData', JSON.stringify(res));
        //             template();
        //         }
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });
    }
    return false;
}
function signUpCompany() {
    document.querySelector('#messageSignupCompany').innerHTML = ""
    document.querySelector('#messageSignupCompany').style.display = 'none'
    var companyName = document.getElementById("company-name").value
    var companyAddress = document.getElementById("company-address").value
    var companyCity = document.getElementById("company-city").value
    var companyWeb = document.getElementById("company-web").value
    var contactName = document.getElementById("contact-name").value
    var contactEmail = document.getElementById("contact-email").value
    var contactPhone = document.getElementById("contact-phone").value
    var password = document.getElementById("passwordEmploye").value
    var subscribeMail = document.getElementById("subscribe-email-company").checked
    var subscribeSMS = document.getElementById("subscribe-sms-company").checked

    const dataCompany = {
        company_name: companyName,
        company_address: companyAddress,
        company_city: companyCity,
        company_website: companyWeb,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        password: password,
        subscribe_email: subscribeMail,
        subscribe_sms: subscribeSMS
    }

    console.log(dataCompany);

    // $.ajax({
    //     url: 'http://localhost:8000/api/v1.0/signup',
    //     headers: {
    //         'Content-Type':'application/json'
    //     },       
    //     method: 'POST',
    //     type: 'json',
    //     data: JSON.stringify(signUpData),
    //     success: function (res) {
    //         if (res.error) {
    //             document.querySelector('#messageSignup').innerHTML += `${res.error}`
    //             document.querySelector('#messageSignup').style.display = 'block'
    //         } else {
    //             toggleSignUp();
    //             document.querySelector('#message').innerHTML += "Your Data has been saved, please login to continue"
    //             document.querySelector('#message').style.display = 'block'
    //         }
            
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });
}

function signUpEmploye() {
    document.querySelector('#messageSignupEmploye').innerHTML = ""
    document.querySelector('#messageSignupEmploye').style.display = 'none'
    var firstname = document.getElementById("firstname-employe").value
    var lastname = document.getElementById("lastname-employe").value
    var email = document.getElementById("email-employe").value
    var phone = document.getElementById("phone-employe").value
    var password = document.getElementById("passwordEmploye").value
    var subscribeMail = document.getElementById("subscribe-email-employe").checked
    var subscribeSMS = document.getElementById("subscribe-sms-employe").checked

    const dataEmploye = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        subscribe_email: subscribeMail,
        subscribe_sms: subscribeSMS
    }

    console.log(dataEmploye);

    // $.ajax({
    //     url: 'http://localhost:8000/api/v1.0/signup',
    //     headers: {
    //         'Content-Type':'application/json'
    //     },       
    //     method: 'POST',
    //     type: 'json',
    //     data: JSON.stringify(signUpData),
    //     success: function (res) {
    //         if (res.error) {
    //             document.querySelector('#messageSignup').innerHTML += `${res.error}`
    //             document.querySelector('#messageSignup').style.display = 'block'
    //         } else {
    //             toggleSignUp();
    //             document.querySelector('#message').innerHTML += "Your Data has been saved, please login to continue"
    //             document.querySelector('#message').style.display = 'block'
    //         }
            
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });

    return false;
}

function resetPassword() {
    document.querySelector('#messageReset').innerHTML = ""
    document.querySelector('#messageReset').style.display = 'none'
    var email = document.querySelector('#resetEmail').value

    console.log(email);

    // $.ajax({
    //     url: 'http://localhost:8000/api/v1.0/reset_password',
    //     headers: {
    //         'Content-Type':'application/json'
    //     },       
    //     method: 'POST',
    //     type: 'json',
    //     data: JSON.stringify({'email' : email}),
    //     success: function (res) {
    //         if (res.error) {
    //             document.querySelector('#messageReset').innerHTML += `${res.error}`
    //             document.querySelector('#messageReset').style.display = 'block'
    //         } else {
    //             toggleResetPswd();
    //             document.querySelector('#message').innerHTML += "Please check your email and try to login"
    //             document.querySelector('#message').style.display = 'block'
    //         }
            
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });
    return false;
}

function template() {
    if (winLoc.indexOf('_tr') > -1) {
        window.location = "index_tr.html";
    } else {
        window.location = "index.html";
    }
}