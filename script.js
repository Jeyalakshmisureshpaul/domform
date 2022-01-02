const btn_submit = document.querySelector("#submit");
const btn_reset = document.querySelector("#reset");
const form = document.querySelector("#form");
const table = document.querySelector("table");


const tbody = document.querySelector("#tbody");


const firstname = document.querySelector("#first-name");
const lastname = document.querySelector("#last-name");
const gender = document.querySelector("#gender");
const food = document.querySelectorAll(".Checkbox");
const pincode = document.querySelector("#pincode");
const address = document.querySelector("#address");
const state = document.querySelector("#State");
const country = document.querySelector("#Country");


let rowArray = [];

let editing = false;

let Table = function Table(
  firstname,
  lastname,
  address,
  pincode,
  gender,
  checkedFood,
  state,
  country
) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.id = this.count;
  this.address = address;
  this.pincode = pincode;
  this.gender = gender;
  this.checkedFood = checkedFood;
  this.state = state;
  this.country = country;
};


function updateTable() {
  let html = "";
  let count = 0;
  rowArray.forEach(function (element) {
    const currentElement = element;
    currentElement.id = count;
    html += `<tr id=${currentElement.id}>
  <td>${currentElement.firstname}</td>
  <td>${currentElement.lastname}</td>
   <td>${currentElement.address}</td>
   <td>${currentElement.pincode}</td>
   <td>${currentElement.gender}</td>
   <td>${currentElement.checkedFood}</td>
   <td>${currentElement.state}</td>
   <td>${currentElement.country}</td>
</tr>`;
    count++;
  });
  tbody.innerHTML = html;
  setLocal(); 
}

function changeElement(element, checkedFood) {
  element.firstname = firstname.value;
  element.lastname = lastname.value;
  element.address = address.value;
  element.pincode = pincode.value;
  element.gender = gender.value;
  element.checkedFood = checkedFood;
  element.state = state.value;
  element.country = country.value;
  editing = false;
}


form.addEventListener("submit", function (e) {
 
  e.returnValue = false; 

  
  const checkedFood = [];
  food.forEach(function (el) {
    if (el.checked == true) {
      checkedFood.push(el.value);
    }
  });
  if (checkedFood.length < 2) {
    alert("Select at least two food items");
    return;
  }
  console.log(checkedFood);
  if (!editing) {
    const row = new Table(
      firstname.value,
      lastname.value,
      address.value,
      pincode.value,
      gender.value,
      checkedFood,
      state.value,
      country.value
    );
    rowArray.push(row);
  } else changeElement(checkedFood);
  firstname.value =
    lastname.value =
    address.value =
    pincode.value =
    state.value =
    country.value =
      "";
  gender.value = "";
  food.forEach((el) => (el.checked = false));
  updateTable();
});

function setLocal() {
  localStorage.setItem("table", JSON.stringify(rowArray));
}

let localArray = JSON.parse(localStorage.getItem("table"));
if (localArray) {
  rowArray = localArray;
  updateTable();
}

function reset() {
 
  localStorage.removeItem("table");
  location.reload();
}

btn_reset.addEventListener("click", reset);