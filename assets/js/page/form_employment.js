// == Phone Format ==
document.getElementById('contact-phone').addEventListener("keyup", function(){
    txt=this.value;
    if (txt.length==3 || txt.length==7 || txt.length==8)
        this.value=this.value+" ";
});

// add more required
$(".add-required").click(function(e){
    e.preventDefault();
    var nextRequired = document.querySelectorAll("#fieldRequired .requiredContent").length;
    var addto = "#fieldRequired" + nextRequired;
    nextRequired = nextRequired + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addRequire = "Gerekli Ekle"
    } else {
        var addRequire = "Add Required"
    }
    
    var html = '';
    html += '<div class="requiredContent mt-3 col-md-12" id="fieldRequired'+ nextRequired +'">';
    html += '<div class="input-group">';
    html += '<input type="text" class="form-control input-field" id="required-'+ nextRequired +'" placeholder="'+ addRequire +'" required>';
    html += '<button id="remove-' + (nextRequired - 1) + '" class="addRemoveField btn btn-danger remove-required" type="button">-</button>';
    html += '</div>';
    html += '</div>';
    
    var newInput = html;
    $(addto).after(newInput);
    $("#fieldRequired" + nextRequired).attr('data-source',$(addto).attr('data-source'));
    $("#countRequired").val(nextRequired);

    $('.remove-required').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumRequired = parseInt(thisID) + 1
        var fieldIDRequired = "#fieldRequired" + fieldNumRequired;
        $(this).remove();
        $(fieldIDRequired).remove();
    });
});

// add more preferred
$(".add-preferred").click(function(e){
    e.preventDefault();
    var nextPreferred = document.querySelectorAll("#fieldPreferred .preferredContent").length;
    var addto = "#fieldPreferred" + nextPreferred;
    nextPreferred = nextPreferred + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addPreferred = "Gerekli Ekle"
    } else {
        var addPreferred = "Add Preferred"
    }
    
    var html = '';
    html += '<div class="preferredContent mt-3 col-md-12" id="fieldPreferred'+ nextPreferred +'">';
    html += '<div class="input-group">';
    html += '<input type="text" class="form-control input-field" id="preferred-'+ nextPreferred +'" placeholder="'+ addPreferred +'" required>';
    html += '<button id="remove-' + (nextPreferred - 1) + '" class="addRemoveField btn btn-danger remove-preferred" type="button">-</button>';
    html += '</div>';
    html += '</div>';
    
    var newInput = html;
    $(addto).after(newInput);
    $("#fieldPreferred" + nextPreferred).attr('data-source',$(addto).attr('data-source'));
    $("#countPreferred").val(nextPreferred);

    $('.remove-preferred').click(function(e){
        e.preventDefault();
        var thisID = this.id.split("-")[1]
        var fieldNumPreferred = parseInt(thisID) + 1
        var fieldIDPreferred = "#fieldPreferred" + fieldNumPreferred;
        $(this).remove();
        $(fieldIDPreferred).remove();
    });
});

// add more skill
$(".add-skill").click(function(e){
    e.preventDefault();
    var nextSkill = document.querySelectorAll("#fieldSkill .skillContent").length;
    var addto = "#fieldSkill" + nextSkill;
    nextSkill = nextSkill + 1;

    if (winLoc.indexOf('_tr') > -1) {
        var addSkill = "Gerekli Ekle"
    } else {
        var addSkill = "Add Skill"
    }
    
    var html = '';
    html += '<div class="skillContent" id="fieldSkill'+ nextSkill +'">';
    html += '<div class="input-group mt-3 col-md-3">';
    html += '<input type="text" class="form-control input-field" id="skill-'+ nextSkill +'" placeholder="'+ addSkill +'" required>';
    html += '<button id="remove-' + (nextSkill - 1) + '" class="addRemoveField btn btn-danger remove-skill" type="button">-</button>';
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

// == SUBMIT FORM ==

function submitDataEmployment() {
    const userData = JSON.parse(user);

    var user_id = userData.user_id
    var company = document.querySelector("#company-name").value
    var address = document.querySelector("#company-address").value;
    var city = document.querySelector("#company-city").value;
    var contactName = document.querySelector("#contact-name").value;
    var contactEmail = document.querySelector("#contact-email").value;
    var contactPhone = document.querySelector("#contact-phone").value;
    var jobTitle = document.querySelector("#job-title").value;
    var jobLocation = document.querySelector("#job-location").value;
    var jobStatus = document.querySelectorAll('select#job-status option:checked')[0].innerText
    var jobDescription = document.querySelector("#job-description").value
    var searchCount = 0;
    var requirementData = [];
    var preferredsData = [];
    var skillsData = [];

    try {
        var requirements = document.querySelectorAll("#requirements .requiredContent")
        for (var i = 0; i < requirements.length; i++) {
            y = i + 1;
            var required = document.getElementById("required-"+y).value

            var reqData = {
                required: required,
            }
            requirementData.push(reqData)
        }
    } catch (err) { }

    try {
        var preferreds = document.querySelectorAll("#preferreds .preferredContent")
        for (var i = 0; i < preferreds.length; i++) {
            y = i + 1;
            var preferred = document.getElementById("preferred-"+y).value

            var preData = {
                preferred: preferred,
            }
            preferredsData.push(preData)
        }
    } catch (err) { }

    try {
        var skills = document.querySelectorAll("#skills .skillContent")
        for (var i = 0; i < skills.length; i++) {
            y = i + 1;
            var skill = document.getElementById("skill-"+y).value

            var skillData = {
                required_skill: skill,
            }
            skillsData.push(skillData)
        }
    } catch (err) { }

    var employment_data = {
        user_id: "",
        company_name: "",
        company_address: "",
        company_city: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        job_title: "",
        job_location: "",
        job_status: "",
        job_description: "",
        search_count: "",
        required_skills: "",
        requirements: "",
        preferreds: "",
    };

    employment_data.user_id = user_id;
    employment_data.company_name = company;
    employment_data.company_address = address;
    employment_data.company_city = city;
    employment_data.contact_name = contactName;
    employment_data.contact_email = contactEmail;
    employment_data.contact_phone = contactPhone;
    employment_data.job_title = jobTitle;
    employment_data.job_location = jobLocation;
    employment_data.job_status = jobStatus;
    employment_data.job_description = jobDescription;
    employment_data.search_count = searchCount;
    employment_data.required_skills = skillsData;
    employment_data.requirements = requirementData;
    employment_data.preferreds = preferredsData;

    if (winLoc.indexOf('edit') > -1) {
        var job_id = winLoc.split('=')[1]
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/job/' + job_id,
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + userData.token
            },       
            method: 'PUT',
            type: 'json',
            data: JSON.stringify(employment_data),
            success: function (res) {
                if (res) {
                    if (winLoc.indexOf('_tr') > -1) {
                        var url = "./detail_search_employment_tr.html?candidate_id=" + res.id
                    } else {
                        var url = "./detail_search_employment_en.html?candidate_id=" + res.id
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
            url: 'http://localhost:8000/api/v1.0/job',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + userData.token
            },       
            method: 'POST',
            type: 'json',
            data: JSON.stringify(employment_data),
            success: function (res) {
                if (res) {
                    if (winLoc.indexOf('_tr') > -1) {
                        var url = "./detail_search_employment_tr.html?candidate_id=" + res.id
                    } else {
                        var url = "./detail_search_employment_en.html?candidate_id=" + res.id
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
    document.querySelector('#form-employees .detail-header h4').innerText = "Update job post"
    var form = document.querySelector('#jobform')
    form.querySelector('#company input#company-name').value = data.company_name
    form.querySelector('#company input#company-address').value = data.company_address
    form.querySelector('#company input#company-city').value = data.company_city
    form.querySelector('#contact input#contact-name').value = data.contact_name
    form.querySelector('#contact input#contact-email').value = data.contact_email
    form.querySelector('#contact input#contact-phone').value = data.contact_phone
    form.querySelector('#job-requirement input#job-title').value = data.job_title
    form.querySelector('#job-requirement input#job-location').value = data.job_location
    form.querySelector('#job-requirement select#job-status').value = data.job_status
    form.querySelector('#description textarea#job-description').value = data.job_description

    if (data.requirements.length > 0) {
        var requirements_element = document.querySelector("#fieldRequired");
        var requirements = data.requirements;
        requirements.map(function (el, key) {
            if (key < 1) {
                document.querySelector('input#required-1').value = el.required
            } else {
                var x = key + 1;
                var fieldID = "fieldRequired" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("requiredContent", "mt-3", "col-md-12");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                <div class="input-group">
                    <input type="text" class="form-control input-field" id="required-${x}" value="${el.required}" required>
                    <button id="required-${x}" class="addRemoveField btn btn-danger remove-required" type="button">-</button>
                </div>
                `;

                requirements_element.append(elementItem);

                $('.remove-required').click(function(e){
                    e.preventDefault();
                    var fieldNumRequired = this.id.split("-")[1]
                    var fieldIDRequired = "#fieldRequired" + fieldNumRequired;
                    $(this).remove();
                    $(fieldIDRequired).remove();
                });

            }
        });
    }

    if (data.preferreds.length > 0) {
        var preferreds_element = document.querySelector("#fieldPreferred");
        var preferreds = data.preferreds;
        preferreds.map(function (el, key) {
            if (key < 1) {
                document.querySelector('input#preferred-1').value = el.preferred
            } else {
                var x = key + 1;
                var fieldID = "fieldPreferred" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("preferredContent", "mt-3", "col-md-12");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                <div class="input-group">
                    <input type="text" class="form-control input-field" id="preferred-${x}" value="${el.preferred}" required>
                    <button id="preferred-${x}" class="addRemoveField btn btn-danger remove-preferred" type="button">-</button>
                </div>
                `;

                preferreds_element.append(elementItem);

                $('.remove-preferred').click(function(e){
                    e.preventDefault();
                    var fieldNumPreferred = this.id.split("-")[1]
                    var fieldIDPreferred = "#fieldPreferred" + fieldNumPreferred;
                    $(this).remove();
                    $(fieldIDPreferred).remove();
                });

            }
        });
    }

    if (data.required_skills.length > 0) {
        var required_skills_element = document.querySelector("#fieldSkill");
        var required_skills = data.required_skills;
        required_skills.map(function (el, key) {
            if (key < 1) {
                document.querySelector('input#skill-1').value = el.required_skill
            } else {
                var x = key + 1;
                var fieldID = "fieldSkill" + x;
                var elementItem = document.createElement("div");
                elementItem.classList.add("skillContent");
                elementItem.setAttribute("id", fieldID);

                elementItem.innerHTML += `
                <div class="input-group mt-3 col-md-3">
                    <input type="text" class="form-control input-field" id="skill-${x}" value="${el.required_skill}" required>
                    <button id="skill-${x}" class="addRemoveField btn btn-danger remove-skill" type="button">-</button>
                </div>
                `;

                required_skills_element.append(elementItem);
                
                $('.remove-skill').click(function(e){
                    e.preventDefault();
                    var fieldNumSkill = this.id.split("-")[1]
                    var fieldIDSkill = "#fieldSkill" + fieldNumSkill;
                    $(this).remove();
                    $(fieldIDSkill).remove();
                });
            }
        });
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
        var job_id = winLoc.split('=')[1]
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/job/' + job_id,
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