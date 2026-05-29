const formSteps =
document.querySelectorAll(".form-step");

const nextBtns =
document.querySelectorAll(".next-btn");

const prevBtns =
document.querySelectorAll(".prev-btn");

const progress =
document.getElementById("progress");

const steps =
document.querySelectorAll(".step");

let currentStep = 0;

/* SHOW STEP */

function showStep(step){

  formSteps.forEach((formStep) => {

    formStep.classList.remove("active");

  });

  formSteps[step]
  .classList.add("active");

  /* PROGRESS BAR */

  const progressPercent =
  ((step + 1) / formSteps.length) * 100;

  progress.style.width =
  `${progressPercent}%`;

  /* STEP INDICATOR */

  steps.forEach((item) => {

    item.classList.remove("active-step");

  });

  steps[step]
  .classList.add("active-step");

  /* SUMMARY */

  if(step === 3){
    showSummary();
  }

}

/* NEXT BUTTON */

nextBtns.forEach((button) => {

  button.addEventListener("click", () => {

    if(validateStep()){

      currentStep++;

      showStep(currentStep);

    }

  });

});

/* PREVIOUS BUTTON */

prevBtns.forEach((button) => {

  button.addEventListener("click", () => {

    currentStep--;

    showStep(currentStep);

  });

});

/* VALIDATION */

function validateStep(){

  /* STEP 1 */

  if(currentStep === 0){

    const name =
    document.getElementById("fullName").value;

    const dob =
    document.getElementById("dob").value;

    const gender =
    document.getElementById("gender").value;

    if(
      name === "" ||
      dob === "" ||
      gender === ""
    ){

      alert("Please fill all fields");

      return false;
    }

  }

  /* STEP 2 */

  if(currentStep === 1){

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    if(
      email === "" ||
      phone === ""
    ){

      alert(
        "Please fill all required fields"
      );

      return false;
    }

    const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){

      alert("Enter valid email");

      return false;
    }

    if(phone.length < 10){

      alert(
        "Phone number must be 10 digits"
      );

      return false;
    }

  }

  /* STEP 3 */

  if(currentStep === 2){

    const track =
    document.getElementById("track").value;

    if(track === ""){

      alert("Please select track");

      return false;
    }

  }

  return true;
}

/* SUMMARY */

function showSummary(){

  const summary =
  document.getElementById("summary");

  summary.innerHTML = `

    <p>
      <strong>Name:</strong>
      ${document.getElementById("fullName").value}
    </p>

    <p>
      <strong>DOB:</strong>
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
      <strong>Phone:</strong>
      ${document.getElementById("phone").value}
    </p>

    <p>
      <strong>Team Name:</strong>
      ${document.getElementById("teamName").value}
    </p>

    <p>
      <strong>Track:</strong>
      ${document.getElementById("track").value}
    </p>

    <p>
      <strong>T-Shirt:</strong>
      ${document.getElementById("shirt").value}
    </p>

  `;

}

/* SUBMIT */

document
.getElementById("multiStepForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  alert(
    "Registration Successful 🚀"
  );

});