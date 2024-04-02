// Array containing prompts for user input
const prompts = [
  { label: "First Name", id: "firstName", type: "text" },
  { label: "Last Name", id: "lastName", type: "text" },
  { label: "Date of Birth", id: "dob", type: "date" },
  { label: "Email Address", id: "email", type: "email" },
  { label: "Gender", id: "gender", type: "text" }
];

// DOM elements
const promptContainer = document.getElementById("promptContainer");
const progressBar = document.getElementById('progressBar').querySelector('span');
const progressText = document.getElementById('progressText');
const userOutput = document.getElementById('userOutput');
const skipButton = document.getElementById('skipButton');
const submitButton = document.getElementById('submitButton');
const editButton = document.getElementById('editButton');

// Variables to manage user input
let currentStep = 0;
let userData = {};
let filledFields = 0;
let usersDataArray = []; // Array to store all users' data

// Function to display prompts for user input
function displayPrompt() {
  const prompt = prompts[currentStep];
  const input = document.createElement("input");
  input.setAttribute("type", prompt.type);
  input.setAttribute("placeholder", prompt.label);
  input.setAttribute("id", prompt.id);
  promptContainer.innerHTML = '';
  promptContainer.appendChild(input);
  updateProgress();
}

// Function to update progress bar
function updateProgress() {
  const progress = (filledFields / prompts.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${progress.toFixed(0)}%`;
}

// Function to display user data
function displayUserData() {
  userOutput.innerHTML = '';
  usersDataArray.forEach((userData, index) => {
      if (index > 0) {
          userOutput.innerHTML += '<hr>'; // Add a ruler line between users' data
      }
      userOutput.innerHTML += '<div class="userDetails">';
      for (const [key, value] of Object.entries(userData)) {
          userOutput.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      }
      userOutput.innerHTML += '</div>';
  });
}

// Function to handle submission of prompts
function submitPrompt() {
  const prompt = prompts[currentStep];
  const input = document.getElementById(prompt.id);
  const value = input.value.trim();
  if (value !== "") {
      userData[prompt.label] = value;
      filledFields++;
  }
  currentStep++;
  if (currentStep < prompts.length) {
      displayPrompt();
  } else {
      usersDataArray.push(userData); // Save current user data
      displayUserData();
      // Reset the form for a new user
      currentStep = 0;
      userData = {};
      filledFields = 0;
      displayPrompt();
  }
  updateProgress();
}

// Function to skip prompts
function skipPrompt() {
  filledFields++;
  currentStep++;
  if (currentStep < prompts.length) {
      displayPrompt();
  } else {
      usersDataArray.push(userData); // Save current user data
      displayUserData();
      // Reset the form for a new user
      currentStep = 0;
      userData = {};
      filledFields = 0;
      displayPrompt();
  }
  updateProgress();
}

// Function to edit user data
function editUserData() {
  currentStep = 0;
  userData = {};
  filledFields = 0;
  displayPrompt();
  updateProgress();
}

// Event listeners for buttons
skipButton.addEventListener('click', skipPrompt);
submitButton.addEventListener('click', submitPrompt);
userOutput.addEventListener('click', function(event) {
  if (event.target && event.target.className === 'editButton') {
      editUserData();
  }
});

// Go to top button functionality
document.getElementById("footerbutton").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Display initial prompt
displayPrompt();
