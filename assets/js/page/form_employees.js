var picFile = "";
var cvFile = "";

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

// == Phone Format ==
document.getElementById('phone').addEventListener("keyup", function(){
    txt=this.value;
    if (txt.length==3 || txt.length==7 || txt.length==8)
        this.value=this.value+" ";
});

// == UPLOAD FILE ==
$("#file-cv").on("change", function() {
    cvFile = !!this.files ? this.files : [];
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings("#file-chosen").addClass("selected").html(fileName);
});

// datepicker

$('input[id="dateofbirth"]').daterangepicker({
    changeMonth: true,
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    },
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10)
}, function(start, end, label) {
    $('input[id="dateofbirth"]').val(start.format('DD/MM/YYYY'));
    
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
    $('input[id="graduationdate-1"]').val(start.format('DD/MM/YYYY'));
    
});

$('input[id="experience-startenddate-1"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        cancelLabel: 'Clear'
    },
    showDropdowns: true,
}, function(start, end, label) {
    $('input[id="experience-startenddate-1"]').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    
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
        $('input[id="graduationdate-' + nextEducation + '"]').val(start.format('DD/MM/YYYY'));
        
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
        $('input[id="experience-startenddate-' + next + '"]').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        
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
    html += '<option value="0% - 30%">0% - 30%</option>';
    html += '<option value="30% - 50%">30% - 50%</option>';
    html += '<option value="50% - 70%">50% - 70%</option>';
    html += '<option value="70% - 100%">70% - 100%</option>';
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
    html += '<option value="Beginner">'+ beginner +'</option>';
    html += '<option value="Intermediate">'+ intermediate +'</option>';
    html += '<option value="Advanced">'+ advanced +'</option>';
    html += '<option value="Mastery">'+ mastery +'</option>';
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

function submitDataEmployees() {
    const userData = JSON.parse(user);

    var user_id = userData.user_id
    var picture = document.querySelector(".profile-pic-wrapper .text-uppercase").innerText;
    var firstname = document.querySelector("#firstname").value;
    var lastname = document.querySelector("#lastname").value;
    var dateOfBirth = document.querySelector("#dateofbirth").value;
    var address = document.querySelector("#address").value;
    var city = document.querySelector("#city").value;
    var postcode = document.querySelector("#postcode").value;
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value
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

            var eduData = {
                education_name: education,
                graduation_date: graduationDate,
            }
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

            var expData = {
                company: company,
                start_date: startDate,
                end_date: enddate,
                position_job: position,
                description_job: description_job,
            }
            experienceData.push(expData)
        }
    } catch (err) { }

    try {
        var skills = document.querySelectorAll("#skills .skillContent")
        for (var i = 0; i < skills.length; i++) {
            y = i + 1;
            var skill = document.getElementById("skill-"+y).value
            var skillLevel = document.getElementById("skill-level-"+y).value

            var elSkill = {
                skill_name: skill,
                skill_level: skillLevel,
            }
            skillData.push(elSkill)
        }
    } catch (err) { }

    try {
        var languageSkills = document.querySelectorAll("#language-skills .langContent")
        for (var i = 0; i < languageSkills.length; i++) {
            y = i + 1;
            var lang = document.getElementById("skill-language-"+y).value
            var langLevel = document.getElementById("language-level-"+y).value

            var langData = {
                language_name: lang,
                level: langLevel,
            }
            languageData.push(langData)
        }
    } catch (err) { }

    try {
        var socialMedia = document.querySelectorAll("#sosmeds .sosmedContent")
        for (var i = 0; i < socialMedia.length; i++) {
            y = i + 1;
            var sosmed = document.getElementById("sosmed-name-"+y).value
            var url = document.getElementById("sosmed-"+y).value

            var sosmedData = {
                social_media_name: sosmed,
                social_media_url: url,
            }
            socialMediaData.push(sosmedData)
        }
    } catch (err) { }

    var employees_data = {
        user_id: "",
        picture: "",
        firstname: "",
        lastname: "",
        date_of_birth: "",
        address: "",
        city: "",
        post_code: "",
        email: "",
        phone: "",
        title: "",
        educations: "",
        experiences: "",
        skills: "",
        languages: "",
        cv: "",
        about_me: "",
        social_media: ""
    }

    employees_data.user_id = user_id;
    employees_data.picture = picture;
    employees_data.firstname = firstname;
    employees_data.lastname = lastname;
    employees_data.date_of_birth = dateOfBirth;
    employees_data.address = address;
    employees_data.city = city;
    employees_data.post_code = postcode;
    employees_data.email = email;
    employees_data.phone = phone;
    employees_data.title = jobTitle;
    employees_data.educations = educationData;
    employees_data.experiences = experienceData;
    employees_data.skills = skillData;
    employees_data.languages = languageData;
    employees_data.cv = cv_filename;
    employees_data.about_me = aboutMe;
    employees_data.social_media = socialMediaData;

    console.log(employees_data);

    if (winLoc.indexOf('edit') > -1) {
        var candidate_id = winLoc.split('=')[1]
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/candidate/' + candidate_id,
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + userData.token
            },       
            method: 'PUT',
            type: 'json',
            data: JSON.stringify(employees_data),
            success: function (res) {
                if (res) {
                    if (winLoc.indexOf('_tr') > -1) {
                        var url = "./detail_search_employees_tr.html?candidate_id=" + res.id
                    } else {
                        var url = "./detail_search_employees_en.html?candidate_id=" + res.id
                    }
    
                    location.replace(url);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/candidate',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + userData.token
            },       
            method: 'POST',
            type: 'json',
            data: JSON.stringify(employees_data),
            success: function (res) {
                if (res) {
                    if (winLoc.indexOf('_tr') > -1) {
                        var url = "./detail_search_employees_tr.html?candidate_id=" + res.id
                    } else {
                        var url = "./detail_search_employees_en.html?candidate_id=" + res.id
                    }
    
                    location.replace(url);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    return false;
}

function renderEditData(data) {
    console.log(data);
    document.querySelector('#form-employees .detail-header h4').innerText = "Update your profile."
    var form = document.querySelector('#myform')
    // form.querySelector('#profilePic').setAttribute('src', data.picture)
    // form.querySelector('.uploadProfileInput').value = data.picture
    form.querySelector('.profile-pic-wrapper .upload-file-block .text-uppercase').innerText = data.picture
    form.querySelector('input#firstname').value = data.firstname
    form.querySelector('input#lastname').value = data.lastname
    form.querySelector('input#dateofbirth').value = moment(data.date_of_birth, 'YYYY-MM-DD').format('DD/MM/YYYY')
    form.querySelector('input#address').value = data.address
    form.querySelector('input#city').value = data.city
    form.querySelector('input#postcode').value = data.post_code
    form.querySelector('input#email').value = data.email
    form.querySelector('input#phone').value = data.phone
    form.querySelector('input#job-title').value = data.title
    form.querySelector('.upload-file-content #file-chosen').innerText = data.cv
    form.querySelector('#about textarea#about-me').innerText = data.about_me

    if(data.educations.length > 0) {
        var educations_element = document.querySelector("#fieldEducation");
        var educations = data.educations;
        educations.map(function (el, key) {
            var graduationDate = moment(el.graduation_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            if (key < 1) {
                document.querySelector('#fieldEducation input#education-1').value = el.education_name
                document.querySelector('#fieldEducation input#graduationdate-1').value = graduationDate
            } else {
                var x = key + 1;
                var fieldID = "fieldEducation" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("eduContent", "form-row");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" id="education-${x}" value="${el.education_name}" required>
                    </div>
                    <div class="col-md-5 mb-3">
                        <div class="input-group">
                            <input type="text" class="form-control" id="graduationdate-${x}" value="${graduationDate}"  required>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1 mb-3">
                        <button id="remove-${x}" class="buttonAddRemove btn btn-danger remove-education" type="button">-</button>
                    </div>
                `;

                educations_element.append(elementItem);

                $('.remove-education').click(function(e){
                    e.preventDefault();
                    var fieldNumEducation = this.id.split("-")[1]
                    var fieldIDEducation = "#fieldEducation" + fieldNumEducation;
                    $(this).remove();
                    $(fieldIDEducation).remove();
                });
            }
        })
    }

    if(data.experiences.length > 0) {
        var experiences_element = document.querySelector("#fieldExperience");
        var experiences = data.experiences;
        experiences.map(function (el, key) {
            var startDate = moment(el.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            var endDate = moment(el.end_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            if (key < 1) {
                document.querySelector('#fieldExperience input#experience-company-1').value = el.company
                document.querySelector('#fieldExperience input#experience-startenddate-1').value = startDate +' - '+ endDate
                document.querySelector('#fieldExperience input#experience-position-1').value = el.position_job
                document.querySelector('#fieldExperience textarea#experience-description-1').value = el.description_job
            } else {
                var x = key + 1;
                var fieldID = "fieldExperience" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("expContent", "form-row");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                    
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" id="experience-company-${x}" value="${el.company}" required>
                        <div class="input-group mt-10">
                            <input type="text" class="form-control" id="experience-startenddate-${x}" value="${startDate} - ${endDate}" required>
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupPrepend"><i class="lni lni-calendar"></i></span>
                            </div>
                        </div>
                        <input type="text" class="form-control mt-10" id="experience-position-${x}" value="${el.position_job}" required>
                    </div>
                    <div class="col-md-5 mb-3">
                        <textarea class="form-control" id="experience-description-${x}" rows="5" required>${el.description_job}</textarea>
                    </div>
                    <div class="col-md-1 mb-3">
                        <button id="remove-${x}" class="buttonAddRemove btn btn-danger remove-experience" type="button">-</button>
                    </div>
                `;

                experiences_element.append(elementItem);

                $('.remove-experience').click(function(e){
                    e.preventDefault();
                    var fieldNumExperience = this.id.split("-")[1]
                    var fieldIDExperience = "#fieldExperience" + fieldNumExperience;
                    $(this).remove();
                    $(fieldIDExperience).remove();
                });
            }
        })
    }

    if(data.skills.length > 0) {
        var skills_element = document.querySelector("#fieldSkill");
        var skills = data.skills;
        skills.map(function (el, key) {
            if (key < 1) {
                document.querySelector('#fieldSkill input#skill-1').value = el.skill_name
                document.querySelector('#fieldSkill select#skill-level-1').value = el.skill_level
            } else {
                var x = key + 1;
                var fieldID = "fieldSkill" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("skillContent", "form-row");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" id="skill-${x}" value="${el.skill_name}" required>
                    </div>
                    <div class="col-md-5 mb-3">
                        <select class="form-control" id="skill-level-${x}">
                            <option value="0% - 30%">0% - 30%</option>
                            <option value="30% - 50%">30% - 50%</option>
                            <option value="50% - 70%">50% - 70%</option>
                            <option value="70% - 100%">70% - 100%</option>
                        </select>
                    </div>
                    <div class="col-md-1 mb-3">
                        <button id="remove-${x}" class="buttonAddRemove btn btn-danger remove-skill" type="button">-</button>
                    </div>
            `;

            skills_element.append(elementItem);
            document.querySelector(`#fieldSkill select#skill-level-${x}`).value = el.skill_level

            $('.remove-skill').click(function(e){
                e.preventDefault();
                var fieldNumSkill = this.id.split("-")[1]
                var fieldIDSkill = "#fieldSkill" + fieldNumSkill;
                $(this).remove();
                $(fieldIDSkill).remove();
            });
            }
        })
    }

    if(data.languages.length > 0) {
        var languages_element = document.querySelector("#fieldLanguage");
        var languages = data.languages;
        languages.map(function (el, key) {
            if (key < 1) {
                document.querySelector('#fieldLanguage input#skill-language-1').value = el.language_name
                document.querySelector('#fieldLanguage select#language-level-1').value = el.level
            } else {
                var x = key + 1;
                var fieldID = "fieldLanguage" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("langContent", "form-row");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                    <div class="col-md-6 mb-3">
                        <input type="text" class="form-control" id="skill-language-${x}" value="${el.language_name}" required>
                    </div>
                    <div class="col-md-5 mb-3">
                        <select class="form-control" id="language-level-${x}">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Mastery">Mastery</option>
                        </select>
                    </div>
                    <div class="col-md-1 mb-3">
                        <button id="remove-${x}" class="buttonAddRemove btn btn-danger remove-language" type="button">-</button>
                    </div>
            `;

            languages_element.append(elementItem);
            document.querySelector(`#fieldLanguage select#language-level-${x}`).value = el.level

            $('.remove-skill').click(function(e){
                e.preventDefault();
                var fieldNumSkill = this.id.split("-")[1]
                var fieldIDSkill = "#fieldSkill" + fieldNumSkill;
                $(this).remove();
                $(fieldIDSkill).remove();
            });
            }
        })
    }


    if(data.social_media.length > 0) {
        var social_medias_element = document.querySelector("#fieldSosmed");
        var social_medias = data.social_media;
        social_medias.map(function (el, key) {
            if (key < 1) {
                document.querySelector('#fieldSosmed select#sosmed-name-1').value = el.social_media_name
                document.querySelector('#fieldSosmed input#sosmed-1').value = el.social_media_url
            } else {
                var x = key + 1;
                var fieldID = "fieldSosmed" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("sosmedContent", "form-row");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                    <div class="col-md-6 mb-3">
                        <select class="form-control" id="sosmed-name-${x}">
                            <option value="Facebook">Facebook</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Linkedin">Linkedin</option>
                        </select>
                    </div>
                    <div class="col-md-5 mb-3">
                        <input type="text" class="form-control" id="sosmed-${x}" value="${el.social_media_url}" required>
                    </div>
                    <div class="col-md-1 mb-3">
                        <button id="remove-${x}" class="buttonAddRemove btn btn-danger remove-sosmed" type="button">-</button>
                    </div>
            `;

            social_medias_element.append(elementItem);
            document.querySelector(`#fieldSosmed select#sosmed-name-${x}`).value = el.social_media_name

            $('.remove-skill').click(function(e){
                e.preventDefault();
                var fieldNumSkill = this.id.split("-")[1]
                var fieldIDSkill = "#fieldSkill" + fieldNumSkill;
                $(this).remove();
                $(fieldIDSkill).remove();
            });
            }
        })
    }

    

}

function checkUser() {
    if (user == null) {
        if (winLoc.indexOf('_tr') > -1) {
            window.location = "login_tr.html";
        } else {
            window.location = "login.html";
        }
    }

    if (winLoc.indexOf('edit') > -1) {
        var candidate_id = winLoc.split('=')[1]
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/candidate/' + candidate_id,
            headers: {
                'Content-Type':'application/json'
            },       
            method: 'GET',
            type: 'json',
            success: function (res) {
                renderEditData(res)
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}
checkUser()