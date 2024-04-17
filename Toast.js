const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("#signup");
const toggleConfirmPassword = document.querySelector("#togglePassword");


const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement; // lay het cac o input, lam deu het
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const isRequired = (value) => value.trim() === "";

const isBetween = (length, min, max) => length < min || length > max;

const isEmailValid = (email) => {
  const re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
};

const checkUsername = () => {
  const min = 3,
    max = 25;
  const usernameVal = username.value.trim();
  if (isRequired(usernameVal)) {
    showError(username, "Username không được để trống.");
  } else if (isBetween(usernameVal.length, min, max)) {
    showError(username, `Username phải được nằm giữa ${min} và ${max} ký tự.`);
  } else {
    showSuccess(username);
    return true;
  }
  return false;
};

const checkEmail = () => {
  const emailVal = email.value.trim();
  if (isRequired(emailVal)) {
    showError(email, "Email không được để trống.");
  } else if (!isEmailValid(emailVal)) {
    showError(email, "Email không hợp lệ.");
  } else {
    showSuccess(email);
    return true;
  }
  return false;
};

const checkPassword = () => {
  const passwordVal = password.value.trim();
  if (isRequired(passwordVal)) {
    showError(password, "Mật khẩu không được để trống.");
  } else if (!isPasswordSecure(passwordVal)) {
    showError(
      password,
      "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết thường, 1 ký tự viết hoa, 1 số và 1 ký tự đặc biệt trong (!@#$%^&*)"
      
    );
    


  } else {
    showSuccess(password);
    return true;
  }
  return false;
};

const checkConfirmPassword = () => {
  const confirmPasswordVal = confirmPassword.value.trim();
  const passwordVal = password.value.trim();
  if (isRequired(confirmPasswordVal)) {
    showError(confirmPassword, "Xác nhận mật khẩu là bắt buộc");
  } else if (passwordVal !== confirmPasswordVal) {
    showError(confirmPassword, "Xác nhận Mật khẩu không khớp");
  } else {
    showSuccess(confirmPassword);
    return true;
  }
  return false;
};


toggleConfirmPassword.addEventListener("click", function () {
  const type =
  confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});


form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isUsernameValid = checkUsername();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();
  const isConfirmPasswordValid = checkConfirmPassword();
  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
  const successMessage = document.getElementById("1");
  const failureMessage = document.getElementById("2");

  if (isFormValid) {
    successMessage.style.display = "block";
    failureMessage.style.display = "none";
    
  } else {
    
    successMessage.style.display = "none";
    failureMessage.style.display = "block";
  }
});
