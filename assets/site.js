'use strict';
// global variables
var shippay = 0;

// set up based on page
var html = document.querySelector('html');
// Add a `js` class for any JavaScript-dependent CSS
// See https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
html.classList.add('js');

if (html.id === 'shipping-page') {
  // Logic for shipping form
  var form = document.querySelector('form[name="shipping"]');
  var form2 = document.querySelector('form[name="shipping-choice"]');
  restoreFormDataFromLocalStorage(form.name);
  form2.addEventListener('click', saveRadioButton);
  form2.addEventListener('click', reloadRadioButton);
  form.addEventListener('submit', handleFormSubmission);
  form2.addEventListener('submit', handleFormSubmission);
  totalCost();
}

if (html.id === 'billing-page') {
  // Logic for payment form
  var form = document.querySelector('form[name="billing"]');
  restoreFormDataFromLocalStorage(form.name);
  form.addEventListener('click', fillBilling);
  form.addEventListener('submit', handleFormSubmission);
}

if (html.id === 'payment-page') {
  // Logic for payment form
  var form = document.querySelector('form[name="payment"]');
  restoreFormDataFromLocalStorage(form.name);
  form.addEventListener('submit', handleFormSubmission);
}

if (html.id === 'summary-page') {
  // logic for summary page
  renderFormDataFromLocalStorage('shipping');
  renderFormDataFromLocalStorage('billing');
  renderFormDataFromLocalStorage('payment');
  displayCost();
}

// function to submit data and proceed to next page
function handleFormSubmission(event) {
  var targetElement = event.target; // action on the page
  event.preventDefault(); // STOP the default browser behavior
  writeFormDataToLocalStorage(targetElement.name); // STORE all the form data
  window.location.href = targetElement.action; // PROCEED to the URL referenced by the form action
}
// function to write data to local storage
function writeFormDataToLocalStorage(formName, inputElement) {
  var formData = findOrCreateLocalStorageObject(formName);

  // Set just a single input value
  if (inputElement) {
    formData[inputElement.name] = inputElement.value;
  } else {
    // Set all form input values, e.g., on a submit event
    // grab all INPUT LABEL elements from [form]
    var formElements = document.forms[formName].elements;
    for (var i = 0; i < formElements.length; i++) {
      // Don't store empty elements, like the submit button
      if (formElements[i].value !== "") {
        formData[formElements[i].name] = formElements[i].value;
      }
    }
  }

  // Write the formData JS object to localStorage as JSON
  writeJsonToLocalStorage(formName, formData);
}
// function to write a new object to local storage
function findOrCreateLocalStorageObject(keyName) {
  var jsObject = readJsonFromLocalStorage(keyName);

  if (Object.keys(jsObject).length === 0) {
    writeJsonToLocalStorage(keyName, jsObject);
  }

  return jsObject;
}
// takes the INPUT LABEL and returns the user value as an object
function readJsonFromLocalStorage(keyName) {
  var jsonObject = localStorage.getItem(keyName);
  var jsObject = {};
  // try to parse any JSON
  if (jsonObject) {
    try {
      jsObject = JSON.parse(jsonObject);
    } catch(e) {
      console.error(e);
      jsObject = {};
    }
  }

  return jsObject;
}
// key name will be INPUT LABEL and jsObject is user value
function writeJsonToLocalStorage(keyName, jsObject) {
  localStorage.setItem(keyName, JSON.stringify(jsObject));
}
// get rid of all entered data from particular form
function destroyFormDataInLocalStorage(formName) {
  localStorage.removeItem(formName);
}
// function to KEEP entered data when returning to a page
function restoreFormDataFromLocalStorage(formName) {
  var jsObject = readJsonFromLocalStorage(formName);
  var formValues = Object.entries(jsObject);
  if (formValues.length === 0) {
    return; // nothing to restore
  }
  // list to write all form elements to local
  var formElements = document.forms[formName].elements;
  for (var i = 0; i < formValues.length; i++) {
    console.log('Form input key:', formValues[i][0], 'Form input value:', formValues[i][1]);
    // take entered data from local storage and assign to element
    formElements[formValues[i][0]].value = formValues[i][1];
  }
}

// keep entered data when post button is clicked
function renderFormDataFromLocalStorage(storageKey) {
  var jsObject = readJsonFromLocalStorage(storageKey);
  // read keys and values in multidimensional array
  var formValues = Object.entries(jsObject);
  if (formValues.length === 0) {
    return; // nothing to restore, nothing in local storage
  }

  if (storageKey === 'shipping'){
    // show entered data
    var displayElement = document.querySelector('#shipping-sum');
    // the length of items in the multidimensional array
    for (var i = 0; i < formValues.length; i++) {
      var el = displayElement.querySelector('#'+formValues[i][0]);
      el.innerText = formValues[i][1];
      console.log(JSON.stringify(jsObject));
    }2;
  }
  if (storageKey === 'billing'){
    // show entered data
    var displayElement = document.querySelector('#billing-sum');
    // the length of items in the multidimensional array
    for (var i = 1; i < formValues.length; i++) {
      var el = displayElement.querySelector('#'+formValues[i][0]);
      el.innerText = formValues[i][1];
      console.log(JSON.stringify(jsObject));
    }
  }
  if (storageKey === 'payment'){
    // show entered data
    var displayElement = document.querySelector('#payment-sum');
    // the length of items in the multidimensional array
    for (var i = 0; i < formValues.length; i++) {
      var el = displayElement.querySelector('#'+formValues[i][0]);
      el.innerText = formValues[i][1];
      console.log(JSON.stringify(jsObject));
    }
  }

}

// save radio button
function saveRadioButton() {
  // radiobuttons
  var s = document.querySelector('input[name=ship-choice]:checked').value;
  localStorage.setItem("shipping-choice", s);
  console.log('shipping choice: ' + s);

  // set price of shipping
  if (s === "same-day"){
    document.querySelector('input[name=ship-choice]:checked').value = "same-day";
    shippay = 15.99;
    console.log(shippay);
  }
  if (s === "one-day"){
    document.querySelector('input[name=ship-choice]:checked').value = "one-day";
    shippay = 10.99;
    console.log(shippay);
  }
  if (s === "standard"){
    document.querySelector('input[name=ship-choice]:checked').value = "standard";
    shippay = 7.99;
    console.log(shippay);
  }
  return shippay;
}

// reload radio button value
function reloadRadioButton() {
  var S1 = Array.from(document.querySelector('ship-choice'));
  var val1 = localStorage.getItem('s');
  for (var i = 0; i < S1.length; i++) {
    if (S1[i].value == val1) {
      S1[i].checked = true;

    }
  }
}

// make billing the same as shipping if checked
function fillBilling() {
  var jsObject = readJsonFromLocalStorage('shipping');
  console.log(jsObject);
  // grab the user input
  var x = jsObject.shipname;
  console.log(x);
  var shipisbill = document.querySelector('#shipisbill').checked;

  if (shipisbill == true) {
    // set input fields the same as ship
    document.querySelector("#billname").value = jsObject.shipname;
    document.querySelector("#baddress1").value = jsObject.address1;
    document.querySelector("#baddress2").value = jsObject.address2;
    document.querySelector("#bcity").value = jsObject.city;
    document.querySelector("#bstate").value = jsObject.state;
    document.querySelector("#bzip").value =jsObject.zip;
  } else if (shipisbill == false) {
    // allow user to enter info
    document.querySelector("#billname").value = "";
    document.querySelector("#baddress1").value = "";
    document.querySelector("#baddress2").value = "";
    document.querySelector("#bcity").value = "";
    document.querySelector("#bstate").value = "";
    document.querySelector("#bzip").value = "";
  }
}

function totalCost() {
  // hardcode item price
  var item = 18.99;
  var total = 0;
  var subtotal = 0;
  // grab shippay value
  saveRadioButton();
  total = item + shippay;
  subtotal= total.toFixed(2);

  localStorage.setItem("subtotal", subtotal);
  console.log('subtotal: ' + subtotal);

  return subtotal;
}

function displayCost() {
  // write the total and
  document.querySelector('#subtotal').innerText = '$' + localStorage.getItem('subtotal');
  document.querySelector('#ship-choice').innerText = localStorage.getItem('shipping-choice');

}






/**
  * UTILITY FUNCTIONS
  */

// debounce to not execute until after an action has stopped (delay)
function debounce(callback, delay) {
  var timer; // function-scope timer to debounce()
  return function() {
    var context = this; // track function-calling context
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    var args = arguments; // hold onto arguments object
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    // Reset the timer
    clearTimeout(timer);

    // Set the new timer
    timer = setTimeout(function() {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
      callback.apply(context, args);
    }, delay);
  };
}

// throttle to slow execution to a certain amount of elapsed time (limit)
function throttle(callback, limit) {
  var throttling; // function-scope boolean for testing throttle state
  return function() {
    var context = this; // track function-calling context
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    var args = arguments; // hold onto arguments object
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments

    // Run the function if not currently throttling
    if (!throttling) {
      // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
      callback.apply(context, args);
      throttling = true;
      setTimeout(function() {
        throttling = false;
      }, limit);
    }
  };
}
