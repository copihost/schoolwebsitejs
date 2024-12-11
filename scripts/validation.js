

let phoneRegex = /^(\(\d{3}\)\s?|\d{3}[-\s]?)?\d{3}[-\s]?\d{4}$/;  
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
let form=null;
let successMsg=null;
function initValidation(formId, successId) {

  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (input of inputs) {

    input.addEventListener("change", inputChanged );
  }
  form.addEventListener("submit", submitForm );

}
function inputChanged(ev) {
  let el = ev.currentTarget;
  validateForm();
  el.classList.add("was-validated");
}

function submitForm(ev) {
  console.log("in submit");
  let form=ev.currentTarget;

  ev.preventDefault(); 
  ev.stopPropagation();

  validateForm();


  if (!form.checkValidity()) {
    let inputs = document.querySelectorAll("input");
  for (input of inputs) {

    input.classList.add("was-validated");
  }
   
  } else {
    const MyForm = document.getElementById('form_body')
    MyForm.innerHTML = '<div class="closeButton"><img src="items/times-svgrepo-com.svg" alt="x-icon" onclick="hideContactForm()"/></div> <h3 class="padded">Thank you for submitting!</h3>';
    MyForm.onclick = "hideContactForm()"

  }

}


function validateForm() {

  checkRequired("fname", "First Name is Required");
  checkRequired("lname", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");
  
  if(checkRequired("state", "State is Required")){
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }
 
  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex)
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex)
  }
  checkRequired('newspaper', "Must select one.")
}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  let curval = el.value;
  curval = curval.toUpperCase();
  if (stateAbbreviations.includes(curval)){
    valid = true
  }
 
  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  const reg = regex;
  const el = document.getElementById(id);
  const mystr = el.value;
  let valid = false;

  if (reg.test(mystr)){
    valid = true
  } else {
    console.log(msg)
  }

  setElementValidity(id, valid, msg);
  return valid;

}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  console.log(el)
  let type = el.type;
  switch (type) {
    case 'text':
      if (el.value){
      valid = true;
    }
    break;
    case 'checkbox':
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked){
          valid = true;
        }
      });
      break;
    case 'radio':
    case 'tel':
      console.log("type")
      if (el.value){
        valid = true
      }
      break;
    case 'email':
      if (el.value){
        valid = true
      }
      break;

    

  }
  setElementValidity(id, valid, message);
  

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);

  if (valid) {

    el.setCustomValidity('');
  } else {

    el.setCustomValidity(message);
    console.log(message)

  }

}
