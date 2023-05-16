function detailEmploymentRenderTemplate(data) {
    var viewCount = data.search_count + 1
    var viewCount = {search_count: viewCount}

    $.ajax({
        url: 'http://localhost:8000/api/v1.0/job_count/' + data.id,
        headers: {
            'Content-Type':'application/json'
        },       
        method: 'PUT',
        type: 'json',
        data: JSON.stringify(viewCount),
        success: function (res) {
        },
        error: function (error) {
            console.log(error);
        }
    });

    var detailEmploymentElement = document.querySelector("#detail-content-employment");
    var detailEmploymentItem = document.createElement("div");
    detailEmploymentItem.className = 'detail-content-area';
    
    if (data) {
        if (winLoc.indexOf('_tr') > -1) {
            var skill = "Beceriler"
            var required = "Gereklidir"
            var preferred = "Tercihli"
            var jobOverview = "İşe Genel Bakış"
            var datePosted = "Yayınlanma Tarihi"
            var company = "Şirket"
            var location = "Yer"
            var workStatus = "İş durumu"
            var apply = "Şimdi Uygula"
            var email = "E-posta"

            
        } else {
            var skill = "Skills"
            var required = "Required"
            var preferred = "Preferred"
            var jobOverview = "Job Overview"
            var datePosted = "Date Posted"
            var company = "Company"
            var location = "Location"
            var workStatus = "Work Status"
            var apply = "Apply Now"
            var email = "E-mail"

            
        }

        var dateFormat = moment(data.timestamp).format("DD-MM-YYYY");

        detailEmploymentItem.innerHTML += `
        <div class="detail-header">
            <div class="container">
                <h1 class="display-4 font-weight-semi-bold">${data.job_title}</h1>
                <p class="mb-20 mt-20 lead">${data.job_description}</p>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="detail-left-content col-8">
                    <h5>${skill}</h5>
                    <div id="skill-detail" class="detail-content-inner"></div>
                    <h5>${required}</h5>
                    <div id="required-detail" class="detail-content-inner"></div>
                    <h5>${preferred}</h5>
                    <div id="preferred-detail" class="detail-content-inner"></div>
                </div>
                <div class="detail-right-content col-4">
                    <div class="detail-right-content-inner">
                        <h4>${jobOverview}</h4>
                        <div class="detail-job-overview">
                            <ul>
                                <li>
                                    <i class="lni lni-calendar"></i>
                                    <div>
                                        <strong>${datePosted}:</strong>
                                        <span>${dateFormat}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-apartment"></i>
                                    <div>
                                        <strong>${company}:</strong>
                                        <span>${data.company_name}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-map-marker"></i>
                                    <div>
                                        <strong>${location}:</strong>
                                        <span>${data.job_location}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-timer"></i>
                                    <div>
                                        <strong>${workStatus}:</strong>
                                        <span>${data.job_status}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-envelope"></i>
                                    <div>
                                        <strong>${email}:</strong>
                                        <span>${data.contact_email}</span>
                                    </div>
                                </li>
                            </ul>
                            <div class="detail-job-button">
                                <a class="main-btn" href="javascript:void(0)" id="modalBtn" onclick="applyModal()">${apply}</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
        detailEmploymentElement.append(detailEmploymentItem);


        // skill Element
        var skillElement = document.querySelector("#skill-detail");
        var skillItem = document.createElement("ul");
        var skills = data.required_skills

        skills.map(function (skillList, k) {
            skillItem.innerHTML += `
                <li>${skillList.required_skill}</li>
            `;
            skillElement.appendChild(skillItem);
        });

        // required Element
        var requiredElement = document.querySelector("#required-detail");
        var requiredItem = document.createElement("ul");
        var requireds = data.requirements

        requireds.map(function (requiredList, k) {
            requiredItem.innerHTML += `
                <li>${requiredList.required}</li>
            `;
            requiredElement.appendChild(requiredItem);
        });

        // preferred Element
        var preferredElement = document.querySelector("#preferred-detail");
        var preferredItem = document.createElement("ul");
        var preferreds = data.preferreds

        preferreds.map(function (preferredList, k) {
            preferredItem.innerHTML += `
                <li>${preferredList.preferred}</li>
            `;
            preferredElement.appendChild(preferredItem);
        });

        if (user !== null && JSON.parse(user).user_as_company == true) {
            document.querySelector('.detail-job-button').style.display = 'none'
        }

    }

}

function detailEmploymentView() {
    var location = window.location.href
    var paramLoc = location.split("=")

    if (paramLoc.length > 1) {
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/job/' + paramLoc[1],
            headers: {
                'Content-Type':'application/json'
            },       
            method: 'GET',
            type: 'json',
            success: function (res) {
                detailEmploymentRenderTemplate(res)
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        if (winLoc.indexOf('_tr') > -1) {
            window.location = "search_employment_tr.html";
        } else {
            window.location = "search_employment_en.html";
        }
    }
}

detailEmploymentView();

function applyModal() {
    if (user !== null) {
        $('#applyModal').modal('show');
    } else {
        if (winLoc.indexOf('_tr') > -1) {
            window.location = "login_tr.html";
        } else {
            window.location = "login.html";
        }
    }
}

//  == MODAL
var picFile = "";
var cvFile = "";

var form = "#myform";
function modalRenderTemplate() {
    var formElement = document.querySelector(form);
    var formItem = document.createElement("div");
    formItem.className = 'modalForm';

    if (winLoc.indexOf('_tr') > -1) {
        var profile_picture = "Profil fotoğrafı"
        var upload_pp = "Yükle <br /> Profil Fotoğrafı"
        var not_pp = "Not: Profil resmi kutusuna tıklayarak profil resmini yükleyin"
        var firstname = "Adınız"
        var lastname = "Soyadınız"
        var birthDay = "Doğum tarihi"
        var address = "Adres"
        var city = "Şehir"
        var poscode = "Posta kodu"
        var mail = "E-posta"
        var phone = "Cep Telefonunuz"
        var jobtitle = "Olarak iş unvanınız"
        var educations = "Eğitimler"
        var education = "Eğitim"
        var graduatdate = "Mezuniyet Tarihi"
        var experience = "İş Deneyimi"
        var company = "Şirket"
        var startEndDate = "Başlangıç - Bitiş tarihi"
        var position = "Olarak konumlandır"
        var description = "İşinizi Tanımlayın.."
        var skill = "Beceriler"
        var addSkill = "Beceri ekle"
        var langSkill = "Dil becerileri"
        var addLang = "Dil ekle"
        var langLevel1 = "Acemi"
        var langLevel2 = "Orta düzey"
        var langLevel3 = "İleri"
        var langLevel4 = "Ustalık"
        var uploadCv = "CV'yi yükle"
        var choseCv = "Dosya seçin"
        var fileChosen = "Dosya seçili değil"
        var noteCv = "Not: İzin verilen maksimum boyut: 5MB. PDF ve Word dosyalarını (docx) kabul ediyoruz."
        var about = "Benim hakkımda"
        var aboutDesc = "Lütfen kendinizden bahsedin..."
        var social_media = "Sosyal medya"
        var social_media_url = "URL ekle"
        var terms = "Evet, şartlar ve koşulları kabul ediyorum"
        document.querySelectorAll('.modal-footer button')[0].innerText = "Kapat"
        document.querySelectorAll('.modal-footer button')[1].innerText = "Formu Gönder"
        document.querySelector('#exampleModalLabel').innerText = "İş Fırsatı Başvurusu"
    } else {
        var profile_picture = "Profile Picture"
        var upload_pp = "Upload <br /> Profile Photo"
        var not_pp = "Note: Upload profile image by click profile picture box"
        var firstname = "First name"
        var lastname = "Last name"
        var birthDay = "Date of Birth"
        var address = "Address"
        var city = "City"
        var poscode = "Postcode"
        var mail = "E-mail"
        var phone = "Phone"
        var jobtitle = "Your job title as"
        var educations = "Educations"
        var education = "Education"
        var graduatdate = "Graduation Date"
        var experience = "Works Experience"
        var company = "Company"
        var startEndDate = "Start - End date"
        var position = "Position as"
        var description = "Description your job.."
        var skill = "Skills"
        var addSkill = "Add skill"
        var langSkill = "Language Skills"
        var addLang = "Add language"
        var langLevel1 = "Beginner"
        var langLevel2 = "Intermediate"
        var langLevel3 = "Advanced"
        var langLevel4 = "Mastery"
        var uploadCv = "Upload CV"
        var choseCv = "Choose File"
        var fileChosen = "No file chosen"
        var noteCv = "Note: Maximum size allowed: 5MB. We accept PDF and Word files (docx)."
        var about = "About me"
        var aboutDesc = "Please describe about yourself..."
        var social_media = "Social Media"
        var social_media_url = "Add URL"
        var terms = "Yes, I agree to terms and conditions"
    }

    formItem.innerHTML += `
    <div class="form-group">
        <h5 class="mt-10 mb-20">${profile_picture}</h5>
        <div class="profile-pic-wrapper">
            <div class="pic-holder">
                <!-- uploaded pic shown here -->
                <img id="profilePic" class="pic">
                <label for="newProfilePhoto" class="upload-file-block">
                    <div class="text-center">
                        <div class="mb-2">
                            <i class="lni lni-camera"></i>
                        </div>
                        <div class="text-uppercase">
                            ${upload_pp}
                        </div>
                    </div>
                </label>
                <Input class="uploadProfileInput" type="file" name="newProfilePhoto" id="newProfilePhoto" accept="image/*" required>
            </div>
        </hr>
        <p class="text-info small">${not_pp}</p>
        </div>
    </div>
    <div class="form-row">
        <div class="col-md-4 mb-3">
            <input type="text" class="form-control" id="firstname" placeholder="${firstname}" required>
        </div>
        <div class="col-md-4 mb-3">
            <input type="text" class="form-control" id="lastname" placeholder="${lastname}" required>
        </div>
        <div class="col-md-4 mb-3">
            <div class="input-group">
                <input type="text" class="form-control" id="dateofbirth" placeholder="${birthDay}" value="" required>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>
                </div>
            </div>
        </div>
    </div>
    <div class="form-row">
        <div class="col-md-4 mb-3">
            <input type="text" class="form-control" id="address" placeholder="${address}" required>
        </div>
        <div class="col-md-4 mb-3">
            <input type="text" class="form-control" id="city" placeholder="${city}" required>
        </div>
        <div class="col-md-4 mb-3">
            <input type="tel" class="form-control" id="postcode" placeholder="${poscode}" pattern="[0-9]{5}" required>
        </div>
    </div>
    <div class="form-row">
        <div class="col-md-6 mb-3">
            <input type="email" class="form-control" id="email" placeholder="${mail}" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
        </div>
        <div class="col-md-6 mb-3">
            <input type="tel" class="form-control" id="phone" placeholder="${phone}" pattern="[0-9]{11}" required>
        </div>
    </div>
    <div class="form-row">
        <div class="col-md-12 mb-3">
            <input type="text" class="form-control" id="job-title" placeholder="${jobtitle}" required>
        </div>
    </div>
    <div id="educations" class="mt-20 mb-30">
        <h5 class="mt-10 mb-20">${educations}</h5>
        <input type="hidden" name="countEducation" value="1" />
        <div class="input-group" id="fieldEducation">
            <div class="eduContent form-row" id="fieldEducation1" name="fieldEducation1">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" id="education-1" placeholder="${education}" required>
                </div>
                <div class="col-md-5 mb-3">
                    <div class="input-group">
                        <input type="text" class="form-control" id="graduationdate-1" placeholder="${graduatdate}" value="" required>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-1 mb-3">
                    <button class="buttonAddRemove btn btn-primary add-education" type="button">+</button>
                </div>
            </div>
        </div>
    </div>
    <div id="experiences" class="mt-20">
        <h5 class="mt-10 mb-20">${experience}</h5>
        <input type="hidden" name="count" value="1" />
        <div class="input-group" id="fieldExperience">
            <div class="expContent form-row" id="fieldExperience1" name="fieldExperience1">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" id="experience-company-1" placeholder="${company}" required>
                    <div class="input-group mt-10">
                        <input type="text" class="form-control" id="experience-startenddate-1" placeholder="${startEndDate}" value="" required>
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>
                        </div>
                    </div>
                    <input type="text" class="form-control mt-10" id="experience-position-1" placeholder="${position}" required>
                </div>
                <div class="col-md-5 mb-3">
                    <textarea class="form-control" id="experience-description-1" rows="5" placeholder="${description}" required></textarea>
                </div>
                <div class="col-md-1 mb-3">
                    <button class="buttonAddRemove btn btn-primary add-more" type="button">+</button>
                </div>
            </div>
        </div>
    </div>
    <div id="skills" class="mt-20">
        <h5 class="mt-10 mb-20">${skill}</h5>
        <input type="hidden" name="countSkill" value="1" />
        <div class="input-group" id="fieldSkill">
            <div class="skillContent form-row" id="fieldSkill1" name="fieldSkill1">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" id="skill-1" placeholder="${addSkill}" required>
                </div>
                <div class="col-md-5 mb-3">
                    <select class="form-control" id="skill-level-1">
                        <option>0% - 30%</option>
                        <option>30% - 50%</option>
                        <option>50% - 70%</option>
                        <option>70% - 100%</option>
                    </select>
                </div>
                <div class="col-md-1 mb-3">
                    <button class="buttonAddRemove btn btn-primary add-skill" type="button">+</button>
                </div>
            </div>
        </div>
    </div>
    <div id="language-skills" class="mt-20 mb-30">
        <h5 class="mt-10 mb-20">${langSkill}</h5>
        <input type="hidden" name="countLanguage" value="1" />
        <div class="input-group" id="fieldLanguage">
            <div class="langContent form-row" id="fieldLanguage1" name="fieldLanguage1">
                <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" id="skill-language-1" placeholder="${addLang}" required>
                </div>
                <div class="col-md-5 mb-3">
                    <select class="form-control" id="language-level-1">
                        <option>${langLevel1}</option>
                        <option>${langLevel2}</option>
                        <option>${langLevel3}</option>
                        <option>${langLevel4}</option>
                    </select>
                </div>
                <div class="col-md-1 mb-3">
                    <button class="buttonAddRemove btn btn-primary add-language" type="button">+</button>
                </div>
                
            </div>
        </div>
    </div>
    <div id="upload-cv" class="form-group mt-20">
        <h5 class="mt-10 mb-20">${uploadCv}</h5>
        <div class="upload-content">
            <input type="file" id="file-cv" accept=".pdf, .docx" required>
            <label class="actual-label btn btn-primary" for="file-cv">${choseCv}</label>
            <span id="file-chosen">${fileChosen}</span>
        </div>
        <span class="small-label">${noteCv}</span>
    </div>
    <div id="about" class="mt-20">
        <h5 class="mt-10 mb-20">${about}</h5>
        <div class="form-row">
            <textarea id="about-me" class="form-control mb-10" rows="5" placeholder="${aboutDesc}" required></textarea>
        </div>
    </div>
    <div id="sosmeds" class="mt-20">
        <h5 class="mt-10 mb-20">${social_media}</h5>
        <input type="hidden" name="countSosmed" value="1" />
        <div class="input-group" id="fieldSosmed">
            <div class="sosmedContent form-row" id="fieldSosmed1" name="fieldSosmed1">
                <div class="col-md-6 mb-3">
                    <select class="form-control" id="sosmed-name-1">
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Instagram</option>
                        <option>Linkedin</option>
                    </select>
                </div>
                <div class="col-md-5 mb-3">
                    <input type="url" class="form-control" id="sosmed-1" placeholder="${social_media_url}" required>
                </div>
                <div class="col-md-1 mb-3">
                    <button class="buttonAddRemove btn btn-primary add-sosmed" type="button">+</button>
                </div>
                
            </div>
        </div>
    </div>
    <div id="termsCond" class="form-group mb-20 mt-40">
        <div class="form-check mt-10">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
            <label class="form-check-label" for="invalidCheck">
                ${terms}
            </label>
        </div>
    </div>
    `;

    formElement.append(formItem);
}

modalRenderTemplate();

// == UPLOAD PICTURE ==
$(document).on("change", ".uploadProfileInput", function () {
    var triggerInput = this;
    var currentImg = $(this).closest(".pic-holder").find(".pic").attr("src");
    var holder = $(this).closest(".pic-holder");
    var wrapper = $(this).closest(".profile-pic-wrapper");
    $(wrapper).find('[role="alert"]').remove();
    picFile = !!this.files ? this.files : [];
    if (!picFile.length || !window.FileReader) {
        return;
    }

    if (/^image/.test(picFile[0].type)) {
        // only image file
        var reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(picFile[0]); // read the local file

        reader.onloadend = function () {
            $(holder).addClass("uploadInProgress");
            $(holder).find(".pic").attr("src", this.result);
            $(holder).append(
            '<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
            );
    
            // Dummy timeout; call API or AJAX below
            setTimeout(() => {
            $(holder).removeClass("uploadInProgress");
            $(holder).find(".upload-loader").remove();
            // If upload successful
            if (Math.random() < 0.9) {
                $(wrapper).append(
                '<div class="snackbar show" role="alert"><i class="lni lni-checkmark-circle text-success"></i> Profile image updated successfully</div>'
                );
    
                // Clear input after upload
                document.querySelector(".upload-file-block").style.opacity = 0;
                document.querySelector(".text-uppercase").innerText = picFile[0].name
                // $(triggerInput).val("");
    
                setTimeout(() => {
                $(wrapper).find('[role="alert"]').remove();
                }, 3000);
            } else {
                $(holder).find(".pic").attr("src", currentImg);
                $(wrapper).append(
                '<div class="snackbar show" role="alert"><i class="lni lni-cross-circle text-danger"></i> There is an error while uploading! Please try again later.</div>'
                );
    
                // Clear input after upload
                $(triggerInput).val("");
                setTimeout(() => {
                $(wrapper).find('[role="alert"]').remove();
                }, 3000);
            }
            }, 1500);
        };
    } else {
        $(wrapper).append(
            '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
        );
        setTimeout(() => {
            $(wrapper).find('role="alert"').remove();
        }, 3000);
    }
});

// == UPLOAD FILE ==
$("#file-cv").on("change", function() {
    cvFile = !!this.files ? this.files : [];
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings("#file-chosen").addClass("selected").html(fileName);
});

// == DATEPICKER ==

$('input[id="dateofbirth"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    },
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
}, function(start, end, label) {
    $('input[id="dateofbirth"]').val(start.format('MM/DD/YYYY'));
    
});

$('input[id="graduationdate-1"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    },
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
}, function(start, end, label) {
    $('input[id="graduationdate-1"]').val(start.format('MM/DD/YYYY'));
    
});

$('input[id="experience-startenddate-1"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    },
    showDropdowns: true,
}, function(start, end, label) {
    $('input[id="experience-startenddate-1"]').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
    
});

// == ADD MORE EDUCATION ==
$(".add-education").click(function(e){
    e.preventDefault();
    var nextEducation = document.querySelectorAll("#fieldEducation .eduContent").length;
    var addto = "#fieldEducation" + nextEducation;
    nextEducation = nextEducation + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var education = "Eğitim"
        var graduation_date = "Mezuniyet Tarihi"
    } else {
        var education = "Education"
        var graduation_date = "Graduation Date"
    }

    var html = '';
    html += '<div class="eduContent form-row" id="fieldEducation' + nextEducation + '" name="fieldEducation' + nextEducation + '">';
    html += '<div class="col-md-6 mb-3">';
    html += '<input type="text" class="form-control" id="education-' + nextEducation + '" placeholder="'+ education +'" required>';
    html += '</div>';
    html += '<div class="col-md-5 mb-3">';
    html += '<div class="input-group">';
    html += '<input type="text" class="form-control" id="graduationdate-' + nextEducation + '" placeholder="'+ graduation_date +'" value="" required>';
    html += '<div class="input-group-prepend">';
    html += '<span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="col-md-1 mb-3">';
    html += '<button id="remove-' + (nextEducation - 1) + '" class="buttonAddRemove btn btn-danger remove-education" type="button">-</button>';
    html += '</div>';
    html += '</div>';
    var newInput = html;
    $(addto).after(newInput);
    $("#fieldEducation" + nextEducation).attr('data-source',$(addto).attr('data-source'));
    $("#countEducation").val(nextEducation);

    $('.remove-education').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumEducation = parseInt(thisID) + 1
        var fieldIDEducation = "#fieldEducation" + fieldNumEducation;
        $(this).remove();
        $(fieldIDEducation).remove();
    });

    $('input[id="graduationdate-' + nextEducation + '"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start, end, label) {
        $('input[id="graduationdate-' + nextEducation + '"]').val(start.format('MM/DD/YYYY'));
        
    });
});

// == ADD MORE EXPERIENCE ==
$(".add-more").click(function(e){
    e.preventDefault();
    var next = document.querySelectorAll("#fieldExperience .expContent").length;
    var addto = "#fieldExperience" + next;
    next = next + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var company = "Şirket"
        var startEndDate = "Başlangıç - Bitiş tarihi"
        var position = "Olarak konumlandır"
        var description = "İşinizi Tanımlayın.."

    } else {
        var company = "Company"
        var startEndDate = "Start - End date"
        var position = "Position as"
        var description = "Description your job.."
    }
    
    var html = '';
    html += '<div class="expContent form-row" id="fieldExperience' + next + '" name="fieldExperience' + next + '">';
    html += '<div class="col-md-6 mb-3">';
    html += '<input type="text" class="form-control" id="experience-company-' + next + '" placeholder="'+ company +'" required>';
    html += '<div class="input-group mt-10">';
    html += '<input type="text" class="form-control" id="experience-startenddate-' + next + '" placeholder="'+ startEndDate +'" value="" required>';
    html += '<div class="input-group-prepend">';
    html += '<span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>';
    html += '</div>';
    html += '</div>';
    html += '<input type="text" class="form-control mt-10" id="experience-position-' + next + '" placeholder="'+ position +'" required>';
    html += '</div>';
    html += '<div class="col-md-5 mb-3">';
    html += '<textarea class="form-control" id="experience-description-' + next + '" rows="5" placeholder="'+ description +'" required></textarea>';
    html += '</div>';
    html += '<div class="col-md-1 mb-3">';
    html += '<button id="remove-' + (next - 1) + '" class="buttonAddRemove btn btn-danger remove-experience" type="button">-</button>';
    html += '</div>';
    html += '</div>';
    var newInput = html;
    $(addto).after(newInput);
    $("#fieldExperience" + next).attr('data-source',$(addto).attr('data-source'));
    $("#count").val(next);

    $('.remove-experience').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNum = parseInt(thisID) + 1
        var fieldID = "#fieldExperience" + fieldNum;
        $(this).remove();
        $(fieldID).remove();
    });

    $('input[id="experience-startenddate-' + next + '"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        },
        showDropdowns: true,
    }, function(start, end, label) {
        $('input[id="experience-startenddate-' + next + '"]').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
        
    });
});

// == ADD MORE SKILL ==
$(".add-skill").click(function(e){
    e.preventDefault();
    var nextSkill = document.querySelectorAll("#fieldSkill .skillContent").length;
    var addto = "#fieldSkill" + nextSkill;
    nextSkill = nextSkill + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addSkill = "Beceri ekle"
    } else {
        var addSkill = "Add skill"
    }

    var html = '';
    html += '<div class="skillContent form-row" id="fieldSkill' + nextSkill + '" name="fieldSkill' + nextSkill + '">';
    html += '<div class="col-md-6 mb-3">';
    html += '<input type="text" class="form-control" id="skill-' + nextSkill + '" placeholder="'+ addSkill +'" required>';
    html += '</div>';
    html += '<div class="col-md-5 mb-3">';
    html += '<select class="form-control" id="skill-level-' + nextSkill + '">';
    html += '<option>0% - 30%</option>';
    html += '<option>30% - 50%</option>';
    html += '<option>50% - 70%</option>';
    html += '<option>70% - 100%</option>';
    html += '</select>';
    html += '</div>';
    html += '<div class="col-md-1 mb-3">';
    html += '<button id="remove-' + (nextSkill - 1) + '" class="buttonAddRemove btn btn-danger remove-skill" type="button">-</button>';
    html += '</div>';
    html += '</div>';

    var newInput = html;
    $(addto).after(newInput);
    $("#fieldSkill" + nextSkill).attr('data-source',$(addto).attr('data-source'));
    $("#countSkill").val(nextSkill);

    $('.remove-skill').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumSkill = parseInt(thisID) + 1
        var fieldIDSkill = "#fieldSkill" + fieldNumSkill;
        $(this).remove();
        $(fieldIDSkill).remove();
    });
});

// == ADD MORE LANGUAGES ==
$(".add-language").click(function(e){
    e.preventDefault();
    var nextLanguage = document.querySelectorAll("#fieldLanguage .langContent").length;
    var addto = "#fieldLanguage" + nextLanguage;
    nextLanguage = nextLanguage + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addLang = "Dil ekle"
        var beginner = "Acemi"
        var intermediate = "Orta düzey"
        var advanced = "İleri"
        var mastery = "Ustalık"
    } else {
        var addLang = "Add language"
        var beginner = "Beginner"
        var intermediate = "Intermediate"
        var advanced = "Advanced"
        var mastery = "Mastery"
    }

    var html = '';
    html += '<div class="langContent form-row" id="fieldLanguage' + nextLanguage + '" name="fieldLanguage' + nextLanguage + '">';
    html += '<div class="col-md-6 mb-3">';
    html += '<input type="text" class="form-control" id="skill-language-' + nextLanguage + '" placeholder="'+ addLang +'" required>';
    html += '</div>';
    html += '<div class="col-md-5 mb-3">';
    html += '<select class="form-control" id="language-level-' + nextLanguage + '">';
    html += '<option>'+ beginner +'</option>';
    html += '<option>'+ intermediate +'</option>';
    html += '<option>'+ advanced +'</option>';
    html += '<option>'+ mastery +'</option>';
    html += '</select>';
    html += '</div>';
    html += '<div class="col-md-1 mb-3">';
    html += '<button id="remove-' + (nextLanguage - 1) + '" class="buttonAddRemove btn btn-danger remove-language" type="button">-</button>';
    html += '</div>';
    html += '</div>';

    var newInput = html;
    $(addto).after(newInput);
    $("#fieldLanguage" + nextLanguage).attr('data-source',$(addto).attr('data-source'));
    $("#countLanguage").val(nextLanguage);

    $('.remove-language').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumLanguage = parseInt(thisID) + 1
        var fieldIDLanguage = "#fieldLanguage" + fieldNumLanguage;
        $(this).remove();
        $(fieldIDLanguage).remove();
    });
});

// == ADD MORE SOSIAL MEDIA ==
$(".add-sosmed").click(function(e){
    e.preventDefault();
    var nextSosmed = document.querySelectorAll("#fieldSosmed .sosmedContent").length;
    var addto = "#fieldSosmed" + nextSosmed;
    nextSosmed = nextSosmed + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addSosmed = "URL ekle"
    } else {
        var addSosmed = "Add URL"
    }

    var html = '';
    html += '<div class="sosmedContent form-row" id="fieldSosmed' + nextSosmed + '" name="fieldSosmed' + nextSosmed + '">';
    html += '<div class="col-md-6 mb-3">';
    html += '<select class="form-control" id="sosmed-name-' + nextSosmed + '">';
    html += '<option>Facebook</option>';
    html += '<option>Twitter</option>';
    html += '<option>Instagram</option>';
    html += '<option>Linkedin</option>';
    html += '</select>';
    html += '</div>';
    html += '<div class="col-md-5 mb-3">';
    html += '<input type="text" class="form-control" id="sosmed-' + nextSosmed + '" placeholder="'+ addSosmed +'" required>';
    html += '</div>';
    html += '<div class="col-md-1 mb-3">';
    html += '<button id="remove-' + (nextSosmed - 1) + '" class="buttonAddRemove btn btn-danger remove-sosmed" type="button">-</button>';
    html += '</div>';
    html += '</div>';

    var newInput = html;
    $(addto).after(newInput);
    $("#fieldSosmed" + nextSosmed).attr('data-source',$(addto).attr('data-source'));
    $("#countSosmed").val(nextSosmed);

    $('.remove-sosmed').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumSosmed = parseInt(thisID) + 1
        var fieldIDSosmed = "#fieldSosmed" + fieldNumSosmed;
        $(this).remove();
        $(fieldIDSosmed).remove();
    });
});

// == SUBMIT FORM ==

function submitForm() {

    console.log("picFile ==>", picFile[0]);
    console.log("cvFile ==>", cvFile[0]);

    // upload picFile =============
    // $.ajax({
    //     url: "",
    //     type: "POST",
    //     data:  new FormData(picFile[0]),
    //     contentType: false,
    //     cache: false,
    //     processData:false,
    //     success: function(data) {
    //         // get url file
    //     },
    //     error: function(e) {
    //         // return error message
    //     }          
    // });

    // upload cvFile =============
    // $.ajax({
    //     url: "",
    //     type: "POST",
    //     data:  new FormData(cvFile[0]),
    //     contentType: false,
    //     cache: false,
    //     processData:false,
    //     success: function(data) {
    //         // get url file
    //     },
    //     error: function(e) {
    //         // return error message
    //     }          
    // });
    
    var picture = document.querySelector(".text-uppercase").value;
    var firstname = document.querySelector("#firstname").value;
    var lastname = document.querySelector("#lastname").value;
    var dateOfBirth = document.querySelector("#dateofbirth").value;
    var address = document.querySelector("#address").value;
    var city = document.querySelector("#city").value;
    var postcode = document.querySelector("#postcode").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    var jobTitle = document.querySelector("#job-title").value;
    var aboutMe = document.querySelector("#about-me").value;
    var cv_filename = document.getElementById("file-chosen").innerText;
    var educationData = [];
    var experienceData = [];
    var skillData = [];
    var languageData = [];
    var socialMediaData = [];

    try {
        var educations = document.querySelectorAll("#educations .eduContent")
        for (var i = 0; i < educations.length; i++) {
            z = i + 1;
            var education = document.getElementById("education-"+z).value
            var graduationDate = document.getElementById("graduationdate-"+z).value

            var eduData = JSON.stringify({
                education: education,
                graduation_date: graduationDate,
            })
            educationData.push(eduData)
        }
    } catch (err) { }

    try {
        var experiences = document.querySelectorAll("#experiences .expContent")
        for (var i = 0; i < experiences.length; i++) {
            x = i + 1;
            var company = document.getElementById("experience-company-"+x).value
            var startDate = document.getElementById("experience-startenddate-"+x).value.split(" - ")[0]
            var enddate = document.getElementById("experience-startenddate-"+x).value.split(" - ")[1]
            var position = document.getElementById("experience-position-"+x).value
            var description_job = document.getElementById("experience-description-"+x).value

            var expData = JSON.stringify({
                company: company,
                start_date: startDate,
                end_date: enddate,
                position_job: position,
                description_job: description_job,
            })
            experienceData.push(expData)
        }
    } catch (err) { }

    try {
        var skills = document.querySelectorAll("#skills .skillContent")
        for (var i = 0; i < skills.length; i++) {
            y = i + 1;
            var skill = document.getElementById("skill-"+y).value
            var skillLevel = document.getElementById("skill-level-"+y).value

            var skillData = JSON.stringify({
                skill: skill,
                level: skillLevel,
            })
            skillData.push(skillData)
        }
    } catch (err) { }

    try {
        var languageSkills = document.querySelectorAll("#language-skills .langContent")
        for (var i = 0; i < languageSkills.length; i++) {
            y = i + 1;
            var lang = document.getElementById("skill-language-"+y).value
            var langLevel = document.getElementById("language-level-"+y).value

            if (winLoc.indexOf('_tr') > -1) {
                if (langLevel == "Acemi") {
                    langLevel = "Beginner";
                } else if (langLevel == "Orta düzey") {
                    langLevel = "Intermediate";
                } else if (langLevel == "İleri") {
                    langLevel = "Advanced";
                } else if (langLevel == "Ustalık") {
                    langLevel = "Mastery";
                }
            }

            var langData = JSON.stringify({
                language: lang,
                level: langLevel,
            })
            languageData.push(langData)
        }
    } catch (err) { }

    try {
        var socialMedia = document.querySelectorAll("#sosmeds .sosmedContent")
        for (var i = 0; i < socialMedia.length; i++) {
            y = i + 1;
            var sosmed = document.getElementById("sosmed-name-"+y).value
            var url = document.getElementById("sosmed-"+y).value

            var sosmedData = JSON.stringify({
                socialMedia: sosmed,
                url: url,
            })
            socialMediaData.push(sosmedData)
        }
    } catch (err) { }

    

    var employees_data = {
        profile_picture: "",
        firstname: "",
        lastname: "",
        date_of_birth: "",
        address: "",
        city: "",
        post_code: "",
        email: "",
        phone: "",
        job_title: "",
        educations: "",
        experiences: "",
        skills: "",
        languages: "",
        cv_filename: "",
        about_me: "",
        social_media: ""
    }

    employees_data.profile_picture = picture;
    employees_data.firstname = firstname;
    employees_data.lastname = lastname;
    employees_data.date_of_birth = dateOfBirth;
    employees_data.address = address;
    employees_data.city = city;
    employees_data.post_code = postcode;
    employees_data.email = email;
    employees_data.phone = phone;
    employees_data.job_title = jobTitle;
    employees_data.educations = educationData;
    employees_data.experiences = experienceData;
    employees_data.skills = skillData;
    employees_data.languages = languageData;
    employees_data.cv_filename = cv_filename;
    employees_data.about_me = aboutMe;
    employees_data.social_media = socialMediaData;
    
    console.log(employees_data);

    // $.ajax({
        //     url: '',
        //     type: 'post',
        //     data: signUpData,
        //     success: function(response){
        //         var msg = "";
        //         if(response == 1){
        //             window.location = "index.html";
        //         }else{
        //             msg = error(response);
        //         }
        //         $("#message").html(msg);
        //     }
        // });

    return false;
}





