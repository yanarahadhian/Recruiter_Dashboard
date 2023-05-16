const user = localStorage.getItem('userData');
const winLoc = window.location.href;

$(function () {

    "use strict";

    //===== Prealoder
    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });

    //===== Sticky
    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
        } else {
            $(".navbar-area").addClass("sticky");
        }
    });

    //===== close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });

    new WOW().init();

    document.addEventListener("DOMContentLoaded", function(){
        if (window.innerWidth > 992) {
            document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){
                everyitem.addEventListener('mouseover', function(e){
                    let el_link = this.querySelector('a[data-bs-toggle]');
                    if(el_link != null){
                        let nextEl = el_link.nextElementSibling;
                        el_link.classList.add('show');
                        nextEl.classList.add('show');
                    }
                });
                everyitem.addEventListener('mouseleave', function(e){
                    let el_link = this.querySelector('a[data-bs-toggle]');
                    if(el_link != null){
                        let nextEl = el_link.nextElementSibling;
                        el_link.classList.remove('show');
                        nextEl.classList.remove('show');
                    }
                })
            });
        }

    }); 

    if (user !== null && JSON.parse(user).user_feedback == false) {
        setTimeout(function(){
            feedbackModal(user);
            $('#feedbackModal').modal({show:true});
        }, 15 * 60 * 1000);
    }

});

function feedbackModal(data) {
    var Element = document.querySelector("#feedbackModal");
    var modalItem = document.createElement("div");
    modalItem.classList.add("modal-dialog");

    if (winLoc.indexOf('_tr') > -1) {
        var helo = "Merhaba"
        var text = "Görüşleriniz bizim için çok önemli, lütfen formu doldurmaktan çekinmeyin </br > Teşekkür ederiz!"
        var btnFeed = "Gönder"
    } else {
        var helo = "Hi"
        var text = "Your feedback is so important for us, please feel free to fill the form </br > Thank you!"
        var btnFeed = "Submit"
    }

    if (data.length > 0) {
        var userData = JSON.parse(data);
        modalItem.innerHTML += `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="feedbackModalLabel" style="text-transform: capitalize;">${helo} ${userData.user_firstname}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span class="mb-20">
                    ${text}
                </span>
                <span class="star-rating">
                    <input type="radio" name="rating" value="1"><i></i>
                    <input type="radio" name="rating" value="2"><i></i>
                    <input type="radio" name="rating" value="3"><i></i>
                    <input type="radio" name="rating" value="4"><i></i>
                    <input type="radio" name="rating" value="5"><i></i>
                </span>
                <form onsubmit="return submitFeedback()">
                    <div class="form-group mt-20">
                        <textarea class="form-control" id="feedback-text" rows="5" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button class="main-btn" type="submit">${btnFeed}</button>
                    </div>  
                </form>
                
            </div>
        </div>
        `;
        Element.appendChild(modalItem);
    }
}

function submitFeedback() {
    var user_id = JSON.parse(user).user_id;
    var feedback_point = "";
    var feedback_comment = document.querySelector("#feedback-text").value
    
    for (i = 0; i < document.getElementsByName('rating').length; i++) {
        if(document.getElementsByName('rating')[i].checked == true) {
            feedback_point = document.getElementsByName('rating')[i].value * 2; 
        }
    }

    
    var feedbackData = {
        user_id: user_id,
        feedback_point: feedback_point,
        feedback_comment: feedback_comment
    };

    console.log(feedbackData);
    document.querySelector('.modal-body').innerHTML = '<span>Thank you for your feedback, we really appreciate it <i class="lni lni-emoji-happy"></i></span>'

    // $.ajax({
    //     url: 'http://localhost:8000/api/v1.0/feedback',
    //     headers: {
    //         'Content-Type':'application/json',
    //         'Authorization':'Bearer ' + userData.token
    //     },       
    //     method: 'POST',
    //     type: 'json',
    //     data: JSON.stringify(feedbackData),
    //     success: function (res) {
    //         if (res) {
    //             document.querySelector('.modal-body').innerHTML = '<span>Thank you for your feedback, we really appreciate it <i class="lni lni-emoji-happy"></i></span>'
    //             setTimeout(function(){
    //                 $('#feedbackModal').hide()
    //             }, 2000);
    //         }
    //     },
    //     error: function (error) {
    //         console.log(error);
    //     }
    // });

    return false;
}

function logout() {
    if (winLoc.indexOf('_tr') > -1) {
        window.location = "index_tr.html";
        localStorage.removeItem("userData")
    } else {
        window.location = "index.html";
        localStorage.removeItem("userData")
    }
    
}

function checkUserRole() {
    if (user !== null) {
        var userLog = JSON.parse(user)

        if (userLog.login_as == 'company') {
            if (document.querySelectorAll('#candidate li')[1]) {
                document.querySelectorAll('#candidate li')[1].style.display = 'none'
            }
        } else {
            if (document.querySelectorAll('#job li')[1]) {
                document.querySelectorAll('#job li')[1].style.display = 'none'
            }
            
        }
    } else {
        if (document.querySelectorAll('#job li')[1] && document.querySelectorAll('#candidate li')[1]) {
            document.querySelectorAll('#candidate li')[1].style.display = 'none'
            document.querySelectorAll('#job li')[1].style.display = 'none'
        }
    }
}

window.onload = function() {
    checkUserRole()
    if (winLoc.indexOf('_tr') > -1) {
        if (user !== null) {
            var signIn = document.querySelector("#signIn")
            signIn.innerHTML = signIn.innerHTML.replace('<a href="./login_tr.html">Üye Girişi</a>', '<a href="#" onclick=logout()>Çıkış</a> <a href="./account_tr.html" class="profileIcon"><i class="lni lni-user"></i></a>')
        }
    } else {
        if (user !== null) {
            var signIn = document.querySelector("#signIn")
            signIn.innerHTML = signIn.innerHTML.replace('<a href="./login.html">Login</a>', '<a href="#" onclick=logout()>Logout</a> <a href="./account.html" class="profileIcon"><i class="lni lni-user"></i></a>')
        }
    }
    
};

window.setTimeout(function() {
    localStorage.removeItem("userData")
}, 60 * 60 * 5000);