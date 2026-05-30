const formSteps =
document.querySelectorAll(".form-step");

const nextBtns =
document.querySelectorAll(".next-btn");

const prevBtns =
document.querySelectorAll(".prev-btn");

const progressBar =
document.getElementById("progressBar");

const progressPercent =
document.getElementById("progressPercent");

const stepIndicators =
document.querySelectorAll(".step");

const form =
document.getElementById("multiStepForm");

const successModal =
document.getElementById("successModal");

const closeModal =
document.getElementById("closeModal");

let currentStep = 0;

/* --------------------
   SHOW CURRENT STEP
-------------------- */

function showStep(step){

  formSteps.forEach((formStep) => {

    formStep.classList.remove("active");

  });

  formSteps[step]
  .classList.add("active");

  updateProgress();

  updateStepIndicator();

  if(step === 3){

    generateSummary();

  }

}

/* --------------------
   PROGRESS BAR
-------------------- */

function updateProgress(){

  const percentage =
  Math.round(
    (currentStep /
    (formSteps.length - 1)) * 100
  );

  progressBar.style.width =
  `${percentage}%`;

  progressPercent.textContent =
  `${percentage}% Completed`;
}
/* --------------------
   STEP INDICATOR
-------------------- */

function updateStepIndicator(){

  stepIndicators.forEach((step) => {

    step.classList.remove(
      "active-step"
    );

  });

  stepIndicators[currentStep]
  .classList.add(
    "active-step"
  );

}

/* --------------------
   NEXT BUTTONS
-------------------- */

nextBtns.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      if(validateStep()){

        saveToLocalStorage();

        currentStep++;

        showStep(currentStep);

      }

    }
  );

});

/* --------------------
   PREVIOUS BUTTONS
-------------------- */

prevBtns.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      currentStep--;

      showStep(currentStep);

    }
  );

});

/* --------------------
   CLEAR ERRORS
-------------------- */

function clearErrors(){

  const errors =
  document.querySelectorAll(".error");

  errors.forEach((error) => {

    error.textContent = "";

  });

}

/* --------------------
   VALIDATION
-------------------- */

function validateStep(){

  clearErrors();

  /* STEP 1 */

  if(currentStep === 0){

    const fullName =
    document.getElementById("fullName")
    .value
    .trim();

    const dob =
    document.getElementById("dob")
    .value;

    const gender =
    document.getElementById("gender")
    .value;

    let valid = true;

    const namePattern =
    /^[A-Za-z ]+$/;

    if(fullName === ""){

      document.getElementById(
        "nameError"
      ).textContent =
      "Full Name is required";

      valid = false;

    }
    else if(
      !namePattern.test(fullName)
    ){

      document.getElementById(
        "nameError"
      ).textContent =
      "Only letters and spaces allowed";

      valid = false;

    }

    if(dob === ""){

      document.getElementById(
        "dobError"
      ).textContent =
      "Date of Birth is required";

      valid = false;

    }

    if(gender === ""){

      document.getElementById(
        "genderError"
      ).textContent =
      "Please select Gender";

      valid = false;

    }

    return valid;

  }

  /* STEP 2 */

  if(currentStep === 1){

    const email =
    document.getElementById("email")
    .value
    .trim();

    const phone =
    document.getElementById("phone")
    .value
    .trim();

    let valid = true;

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
    /^[0-9]{10}$/;

    if(email === ""){

      document.getElementById(
        "emailError"
      ).textContent =
      "Email is required";

      valid = false;

    }
    else if(
      !emailPattern.test(email)
    ){

      document.getElementById(
        "emailError"
      ).textContent =
      "Invalid Email Format";

      valid = false;

    }

    if(phone === ""){

      document.getElementById(
        "phoneError"
      ).textContent =
      "Phone Number is required";

      valid = false;

    }
    else if(
      !phonePattern.test(phone)
    ){

      document.getElementById(
        "phoneError"
      ).textContent =
      "Phone must be exactly 10 digits";

      valid = false;

    }

    return valid;

  }

  /* STEP 3 */

  if(currentStep === 2){

    const track =
    document.getElementById("track")
    .value;

    const shirt =
    document.getElementById("shirt")
    .value;

    if(
      track === "" ||
      shirt === ""
    ){

      alert(
        "Please select Track and T-Shirt Size"
      );

      return false;

    }

  }

  return true;

}

/* --------------------
   SUMMARY
-------------------- */

function generateSummary(){

  const summary =
  document.getElementById(
    "summary"
  );

  summary.innerHTML = `

  <p>
    <strong>Full Name:</strong>
    ${document.getElementById("fullName").value}
  </p>

  <p>
    <strong>Date of Birth:</strong>
    ${document.getElementById("dob").value}
  </p>

  <p>
    <strong>Gender:</strong>
    ${document.getElementById("gender").value}
  </p>

  <p>
    <strong>Email:</strong>
    ${document.getElementById("email").value}
  </p>

  <p>
    <strong>Phone Number:</strong>
    ${document.getElementById("phone").value}
  </p>

  <p>
    <strong>Team Name:</strong>
    ${document.getElementById("teamName").value}
  </p>

  <p>
    <strong>Team Size:</strong>
    ${document.getElementById("teamSize").value}
  </p>

  <p>
    <strong>Role:</strong>
    ${document.getElementById("role").value}
  </p>

  <p>
    <strong>Track:</strong>
    ${document.getElementById("track").value}
  </p>

  <p>
    <strong>T-Shirt Size:</strong>
    ${document.getElementById("shirt").value}
  </p>

  <p>
    <strong>Dietary Restrictions:</strong>
    ${document.getElementById("diet").value}
  </p>

  <p>
    <strong>Additional Notes:</strong>
    ${document.getElementById("notes").value}
  </p>

  `;

}

/* --------------------
   LOCAL STORAGE
-------------------- */

function saveToLocalStorage(){

  const formData = {

    fullName:
    document.getElementById("fullName").value,

    dob:
    document.getElementById("dob").value,

    gender:
    document.getElementById("gender").value,

    email:
    document.getElementById("email").value,

    phone:
    document.getElementById("phone").value,

    teamName:
    document.getElementById("teamName").value,

    teamSize:
    document.getElementById("teamSize").value,

    role:
    document.getElementById("role").value,

    track:
    document.getElementById("track").value,

    shirt:
    document.getElementById("shirt").value,

    diet:
    document.getElementById("diet").value,

    notes:
    document.getElementById("notes").value

  };

  localStorage.setItem(
    "hackathonData",
    JSON.stringify(formData)
  );

}

function loadFromLocalStorage(){

  const savedData =
  JSON.parse(
    localStorage.getItem(
      "hackathonData"
    )
  );

  if(savedData){

    document.getElementById(
      "fullName"
    ).value =
    savedData.fullName || "";

    document.getElementById(
      "dob"
    ).value =
    savedData.dob || "";

    document.getElementById(
      "gender"
    ).value =
    savedData.gender || "";

    document.getElementById(
      "email"
    ).value =
    savedData.email || "";

    document.getElementById(
      "phone"
    ).value =
    savedData.phone || "";

    document.getElementById(
      "teamName"
    ).value =
    savedData.teamName || "";

    document.getElementById(
      "teamSize"
    ).value =
    savedData.teamSize || "";

    document.getElementById(
      "role"
    ).value =
    savedData.role || "";

    document.getElementById(
      "track"
    ).value =
    savedData.track || "";

    document.getElementById(
      "shirt"
    ).value =
    savedData.shirt || "";

    document.getElementById(
      "diet"
    ).value =
    savedData.diet || "";

    document.getElementById(
      "notes"
    ).value =
    savedData.notes || "";

  }

}

/* --------------------
   FORM SUBMIT
-------------------- */

form.addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    saveToLocalStorage();

    successModal.style.display =
    "flex";

    localStorage.removeItem(
      "hackathonData"
    );

  }
);

/* --------------------
   CLOSE MODAL
-------------------- */

closeModal.addEventListener(
  "click",
  () => {

    successModal.style.display =
    "none";

    form.reset();

    currentStep = 0;

    showStep(currentStep);

  }
);

/* --------------------
   INITIAL LOAD
-------------------- */

loadFromLocalStorage();

showStep(currentStep);
    