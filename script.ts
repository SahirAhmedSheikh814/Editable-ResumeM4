// Define an interface for languages
interface Language {
    name: string;
    proficiency: string;
}

let languageCount = 0; // Variable to track the number of languages

// Function to handle form submission
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const getInputValue = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement)?.value || '';
    const getFileInput = (id: string) => (document.getElementById(id) as HTMLInputElement)?.files?.[0] || null;

    const data = {
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

    const languages = collectLanguages();
    const resumeOutput = generateResumeHTML(data, languages);

    if (data.profilePicture) {
        addProfilePicture(data.profilePicture, resumeOutput);
    } else {
        displayResume(resumeOutput);
    }
});

// Helper function to collect languages from the form
function collectLanguages(): Language[] {
    const languages: Language[] = [];
    const languageInputs = document.getElementById('languageContainer')?.querySelectorAll('.languageInput');
    languageInputs?.forEach(input => {
        const languageName = (input.querySelector('input') as HTMLInputElement).value;
        const languageProficiency = (input.querySelector('select') as HTMLSelectElement).value;
        languages.push({ name: languageName, proficiency: languageProficiency });
    });
    return languages;
}

// Helper function to generate HTML for resume output
function generateResumeHTML(data: any, languages: Language[]): string {
    return `
        <h2>Resume</h2>
        <div style="text-align: center;">
            <strong>Name:</strong> ${data.name}<br>
            <strong>Position:</strong> ${data.position}<br>
            <strong>Contact Number:</strong> ${data.contact}<br>
            <strong>Email:</strong> ${data.email}<br>
            <strong>Address:</strong> ${data.address}<br>
        </div>
        <h3>Education</h3>
        <p><strong>${data.educationTitle}</strong> (${data.educationStartDate} - ${data.educationEndDate})<br>${data.educationDescription}</p>
        <h3>Experience</h3>
        <p>${data.experience}</p>
        <h3>Achievements</h3>
        <p><strong>${data.achievementTitle}</strong>: ${data.achievementDescription}</p>
        <h3>Skills</h3>
        <p>${data.skills}</p>
        <h3>Languages</h3>
        <ul>${languages.map(lang => `<li>${lang.name} (${lang.proficiency})</li>`).join('')}</ul>
    `;
}

// Function to display resume
function displayResume(resumeOutput: string) {
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
    }
}

// Function to handle profile picture and update resume output
function addProfilePicture(profilePicture: File, resumeOutput: string): void {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageDataUrl = e.target?.result as string;
        const profilePicHTML = `
            <div class="profilePictureContainer" style="text-align: center;">
                <img src="${imageDataUrl}" class="profilePicture" style="border-radius: 50%; width: 100px; height: 100px;" alt="Profile Picture">
            </div>
        `;
        displayResume(profilePicHTML + resumeOutput);
    };
    reader.readAsDataURL(profilePicture);
}

// Function to handle adding new languages, up to 3 languages
document.getElementById('addLanguageButton')?.addEventListener('click', function() {
    if (languageCount < 3) {
        languageCount++;
        const languageContainer = document.getElementById('languageContainer')!;
        
        const newLanguageInput = document.createElement('div');
        newLanguageInput.classList.add('languageInput');

        newLanguageInput.innerHTML = `
            <label for="languageName${languageCount}">Language: </label>
            <input type="text" id="languageName${languageCount}" name="languageName" required><br>

            <label for="languageProficiency${languageCount}">Proficiency: </label>
            <select id="languageProficiency${languageCount}" name="languageProficiency" required>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
            </select><br>
        `;
        
        languageContainer.appendChild(newLanguageInput);

        if (languageCount === 3) {
            document.getElementById('addLanguageButton')!.style.display = 'none';
        }
    }
});
