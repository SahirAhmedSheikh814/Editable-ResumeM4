var _a, _b;
var languageCount = 0; // Variable to track the number of languages
// Function to handle form submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var getInputValue = function (id) { var _a; return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || ''; };
    var getFileInput = function (id) { var _a, _b; return ((_b = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b[0]) || null; };
    var data = {
        name: getInputValue('name'),
        position: getInputValue('Position'),
        contact: getInputValue('contact'),
        address: getInputValue('address'),
        email: getInputValue('email'),
        profilePicture: getFileInput('profilePicture'),
        educationTitle: getInputValue('educationTitle'),
        educationStartDate: getInputValue('educationStartDate'),
        educationEndDate: getInputValue('educationEndDate'),
        educationDescription: getInputValue('educationDescription'),
        experience: getInputValue('experience'),
        skills: getInputValue('skills'),
        achievementTitle: getInputValue('achievementTitle'),
        achievementDescription: getInputValue('achievementDescription')
    };
    var languages = collectLanguages();
    var resumeOutput = generateResumeHTML(data, languages);
    if (data.profilePicture) {
        addProfilePicture(data.profilePicture, resumeOutput);
    }
    else {
        displayResume(resumeOutput);
    }
});
// Helper function to collect languages from the form
function collectLanguages() {
    var _a;
    var languages = [];
    var languageInputs = (_a = document.getElementById('languageContainer')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.languageInput');
    languageInputs === null || languageInputs === void 0 ? void 0 : languageInputs.forEach(function (input) {
        var languageName = input.querySelector('input').value;
        var languageProficiency = input.querySelector('select').value;
        languages.push({ name: languageName, proficiency: languageProficiency });
    });
    return languages;
}
// Helper function to generate HTML for resume output
function generateResumeHTML(data, languages) {
    return "\n        <h2>Resume</h2>\n        <div style=\"text-align: center;\">\n            <strong>Name:</strong> ".concat(data.name, "<br>\n            <strong>Position:</strong> ").concat(data.position, "<br>\n            <strong>Contact Number:</strong> ").concat(data.contact, "<br>\n            <strong>Email:</strong> ").concat(data.email, "<br>\n            <strong>Address:</strong> ").concat(data.address, "<br>\n        </div>\n        <h3>Education</h3>\n        <p><strong>").concat(data.educationTitle, "</strong> (").concat(data.educationStartDate, " - ").concat(data.educationEndDate, ")<br>").concat(data.educationDescription, "</p>\n        <h3>Experience</h3>\n        <p>").concat(data.experience, "</p>\n        <h3>Achievements</h3>\n        <p><strong>").concat(data.achievementTitle, "</strong>: ").concat(data.achievementDescription, "</p>\n        <h3>Skills</h3>\n        <p>").concat(data.skills, "</p>\n        <h3>Languages</h3>\n        <ul>").concat(languages.map(function (lang) { return "<li>".concat(lang.name, " (").concat(lang.proficiency, ")</li>"); }).join(''), "</ul>\n    ");
}
// Function to display resume
function displayResume(resumeOutput) {
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
}
// Function to handle profile picture and update resume output
function addProfilePicture(profilePicture, resumeOutput) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var imageDataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        var profilePicHTML = "\n            <div class=\"profilePictureContainer\" style=\"text-align: center;\">\n                <img src=\"".concat(imageDataUrl, "\" class=\"profilePicture\" style=\"border-radius: 50%; width: 100px; height: 100px;\" alt=\"Profile Picture\">\n            </div>\n        ");
        displayResume(profilePicHTML + resumeOutput);
    };
    reader.readAsDataURL(profilePicture);
}
// Function to handle adding new languages, up to 3 languages
(_b = document.getElementById('addLanguageButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    if (languageCount < 3) {
        languageCount++;
        var languageContainer = document.getElementById('languageContainer');
        var newLanguageInput = document.createElement('div');
        newLanguageInput.classList.add('languageInput');
        newLanguageInput.innerHTML = "\n            <label for=\"languageName".concat(languageCount, "\">Language: </label>\n            <input type=\"text\" id=\"languageName").concat(languageCount, "\" name=\"languageName\" required><br>\n\n            <label for=\"languageProficiency").concat(languageCount, "\">Proficiency: </label>\n            <select id=\"languageProficiency").concat(languageCount, "\" name=\"languageProficiency\" required>\n                <option value=\"Basic\">Basic</option>\n                <option value=\"Conversational\">Conversational</option>\n                <option value=\"Fluent\">Fluent</option>\n                <option value=\"Native\">Native</option>\n            </select><br>\n        ");
        languageContainer.appendChild(newLanguageInput);
        if (languageCount === 3) {
            document.getElementById('addLanguageButton').style.display = 'none';
        }
    }
});
