function detailEmployeesRenderTemplate(data) {
    console.log(data);
    if (data) {
        var detailEmployeesElement = document.querySelector('#detail-content-employees');
        var detailEmployeesItem = document.createElement("div");
        detailEmployeesItem.className = 'detail-content-area';

        var winLoc = window.location.href;
        if (winLoc.indexOf('_tr') > -1) {
            var education = "Eğitimler"
            var experience = "Deneyimler"
            var skill = "Beceriler"
            var langKnowladge = "Dil bilgisi"
            var sosmed = "Sosyal medya"
            var profile = "Profil"
            var title = "Başlık"
            var birthDay = "Doğum tarihi"
            var address = "Adres"
            var mail = "E-posta"
            var phone = "Cep Telefonunuz"
        } else {
            var education = "Educations"
            var experience = "Experiences"
            var skill = "Skills"
            var langKnowladge = "Language Knowledge"
            var sosmed = "Social Media"
            var profile = "Profile"
            var title = "Title"
            var birthDay = "Date of Birth"
            var address = "Address"
            var mail = "E-mail"
            var phone = "Phone"
        }

        var dateOfBirth = moment(data.date_of_birth).format("DD-MM-YYYY");

        detailEmployeesItem.innerHTML += `
        <div class="detail-header">
            <div class="container">
                <h1 class="display-4 font-weight-semi-bold">${data.firstname} ${data.lastname}</h1>
                <p class="mb-20 mt-20 lead">${data.about_me}</p>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="detail-left-content col-8">
                    <h5>${education}</h5>
                    <div id="education-detail" class="detail-content-inner"></div>
                    <h5>${experience}</h5>
                    <div id="experience-detail" class="detail-content-inner"></div>
                    <h5>${skill}</h5>
                    <div id="skill-detail" class="detail-content-inner"></div>
                    <h5>${langKnowladge}</h5>
                    <div id="lang-detail" class="detail-content-inner"></div>
                    <h5>${sosmed}</h5>
                    <div id="sosmed-detail" class="detail-content-inner"></div>
                </div>
                <div class="detail-right-content col-4">
                    <div class="detail-right-content-inner">
                        <h4>${profile}</h4>
                        <div class="detail-job-overview">
                            <ul>
                                <li>
                                    <i class="lni lni-user"></i>
                                    <div>
                                        <strong>${title}:</strong>
                                        <span>${data.title}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-calendar"></i>
                                    <div>
                                        <strong>${birthDay}:</strong>
                                        <span>${dateOfBirth}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-map-marker"></i>
                                    <div>
                                        <strong>${address}:</strong>
                                        <span>${data.address}, ${data.city}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-envelope"></i>
                                    <div>
                                        <strong>${mail}:</strong>
                                        <span>${data.email}</span>
                                    </div>
                                </li>
                                <li>
                                    <i class="lni lni-phone"></i>
                                    <div>
                                        <strong>${phone}:</strong>
                                        <span>${data.phone}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
        detailEmployeesElement.append(detailEmployeesItem);

        // educations Element
        var educationElement = document.querySelector("#education-detail");
        var educationItem = document.createElement("ul");
        var educations = data.educations

        educations.map(function (educationList, k) {
            educationItem.innerHTML += `
                <li>
                    <div>${educationList.graduation_date}</div>
                    <div>${educationList.education_name}</div>
                </li>
            `;
            educationElement.appendChild(educationItem);
        });

        // experiences Element
        var experienceElement = document.querySelector("#experience-detail");
        var experienceItem = document.createElement("ul");
        var experiences = data.experiences

        experiences.map(function (experienceList, k) {
            
            experienceItem.innerHTML += `
                <li>
                    <div>
                        <div class="expComp">${experienceList.company}</div>
                        <div>${experienceList.start_date} - ${experienceList.end_date}</div>
                        <div>Title as: ${experienceList.position_job}</div>
                        <div>Job description: ${experienceList.description_job}</div>
                    </div>
                </li>
            `;
            experienceElement.appendChild(experienceItem);
        });

        // skill Element
        var skillElement = document.querySelector("#skill-detail");
        var skillItem = document.createElement("ul");
        var skills = data.skills

        skills.map(function (skillList, k) {
            skillItem.innerHTML += `
                <li>${skillList.skill_name}</li>
            `;
            skillElement.appendChild(skillItem);
        });

        // language Element
        var langElement = document.querySelector("#lang-detail");
        var langItem = document.createElement("ul");
        var languages = data.languages

        languages.map(function (langList, k) {
            langItem.innerHTML += `
                <li>${langList.language_name} - ${langList.level}</li>
            `;
            langElement.appendChild(langItem);
        });

        // language Element
        var sosmedElement = document.querySelector("#sosmed-detail");
        var sosmedItem = document.createElement("ul");
        var socMed = data.social_media

        socMed.map(function (socMedList, k) {
            sosmedItem.innerHTML += `
                <li>
                    ${socMedList.social_media_name} - <a href="${socMedList.social_media_url}" target="_blank">${socMedList.social_media_url}</a>
                </li>
            `;
            sosmedElement.appendChild(sosmedItem);
        });
    }
}

function detailEmployeesView() {
    var location = window.location.href
    var paramLoc = location.split("=")

    if (paramLoc.length > 1) {
        $.ajax({
            url: 'http://localhost:8000/api/v1.0/candidate/' + paramLoc[1],
            headers: {
                'Content-Type':'application/json'
            },       
            method: 'GET',
            type: 'json',
            success: function (res) {
                detailEmployeesRenderTemplate(res);
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        if (winLoc.indexOf('_tr') > -1) {
            window.location = "search_employees_tr.html";
        } else {
            window.location = "search_employees_en.html";
        }
        
    }
}

detailEmployeesView();