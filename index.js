var form = document.getElementById("formId");

var errorMessages = document.querySelectorAll('.error.error-message');

const date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();


function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function calculateAge(birthDate) {

  currentDate = new Date();


  var years = currentDate.getFullYear() - birthDate.getFullYear();


  var months = currentDate.getMonth() - birthDate.getMonth();
  if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
    years--;
    if (months < 0) {
      months = 12 + months;
    } else {
      months = 11 + months;
    }
  }


  var days = currentDate.getDate() - birthDate.getDate();
  if (days < 0) {
    var lastMonth = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    days += new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth() + 1,
      0
    ).getDate() + 1;
  }

  return { years, months, days };
}

function validate(e) {
  var flag = true;
  var day = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");

  if (day.value === '' || month.value === '' || year.value === '') {

    errorMessages[0].innerHTML = "All fields are required!";
    errorMessages[1].innerHTML = "";
    errorMessages[2].innerHTML = "";
    flag &= false;
  }
  else {
    errorMessages[0].innerHTML = "";
    errorMessages[1].innerHTML = "";
    errorMessages[2].innerHTML = "";
  }

  if (['1', '3', '5', '7', '8', '10', '12'].includes(month.value)) {
    flag &= day.value <= 31;
    if (!flag)
      errorMessages[0].innerHTML = "invalid Date";

  }
  if (['4', '6', '9', '11'].includes(month)) {
    flag &= day.value <= 30;
    if (!flag)
      errorMessages[0].innerHTML = "invalid Date";
  }
  if (month.value === '2') {
    if (isLeapYear(year.value)) {
      flag &= day.value <= 29;
      if (!flag)
        errorMessages[0].innerHTML = "invalid Date";
    }
    else {
      flag &= day.value <= 28;
      if (!flag)
        errorMessages[0].innerHTML = "invalid Date";
    }
  }
  if (month.value > 12) {
    errorMessages[0].innerHTML = "invalid date";
    errorMessages[1].innerHTML = "invalid month";
    flag &= false;
  }
  if (year.value > this.year) {
    errorMessages[2].innerHTML = "Year must be less than this year";
    flag &= false;
  }


  if (!flag) {
    day.classList.add("error");
    month.classList.add("error");
    year.classList.add("error");
    return false;
  }
  errorMessages[0].innerHTML = "";
  errorMessages[1].innerHTML = "";
  errorMessages[2].innerHTML = "";

  day.classList.remove("error");
  month.classList.remove("error");
  year.classList.remove("error");
  return true
}


function onSubmit() {
  var yearsHolder = document.getElementById("yearsHolder");
  var monthsHolder = document.getElementById("monthsHolder");
  var daysHolder = document.getElementById("daysHolder");

  var day = document.getElementById("day").value;
  var month = document.getElementById("month").value - 1;
  var year = document.getElementById("year").value;
  if (!validate())
    console.log("invalid");
  else {
    const dob = new Date(year, month, day);
    const age = calculateAge(dob);

    yearsHolder.innerHTML = age.years;
    monthsHolder.innerHTML = age.months;
    daysHolder.innerHTML = age.days;
  }


}

