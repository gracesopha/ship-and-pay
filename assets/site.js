'use strict';

//write shipping info to localstorage
var button = document.querySelector('#button');

function saveShipToLocalStorage(){
  var shipname = document.querySelector('#shipname');
  localStorage.setItem('shipname', shipname.value);
  var address1 = document.querySelector('#address1');
  localStorage.setItem('address1', address1.value);
  var address2 = document.querySelector('#address2');
  localStorage.setItem('address2', address2.value);
  var city = document.querySelector('#city');
  localStorage.setItem('city', city.value);
  var state = document.querySelector('#states');
  localStorage.setItem('state', states.value);
  var zip = document.querySelector('#zip');
  localStorage.setItem('zip', zip.value);
}

button.addEventListener('click', saveShipToLocalStorage);


//make billing the same as shipping upon check
function FillBilling(){
  if(document.getElementById("shipisbill").checked){
    document.getElementById("billname").value = document.getElementById("shipname").value;
  }

  else{
     document.getElementById("billname").value = "";
   }
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
  }
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
  }
}
