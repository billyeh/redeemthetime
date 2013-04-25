$(document).ready(function() {
  generateRandom();
});

function generateRandom() {
  // Random generator
  var rand = Math.floor(Math.random() * 4);
  if (rand == 0) {
    getHymn();
  } else if (rand == 1) {
    getVerse();
  } else if (rand == 2) {
    getRadio();
  } else {
    getActivity();
  }
}

function getHymn() {
  alert("getting hymn");
}

function getVerse() {
  alert("getting verse");
}

function getRadio() {
  alert("getting radio");
}

function getActivity() {
  alert("getting activity");
}