$(document).ready(function() {
  generateRandom();
});

function generateRandom() {
  // Random generator;
  var rand = randInt(4);
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
  $("#title")
    .append($("<h3></h3>")
    .text("Enjoy a hymn!"));
}

function getVerse() {
  $("#title")
    .append($("<h3></h3>")
    .text("Try praying and reading over this verse."));
}

function getRadio() {
  $("#title")
    .append($("<h3></h3>")
    .text("Listen to a radio broadcast of a message instead."));
}

function getActivity() {
  $("#title")
    .append($("<h3></h3>")
    .text("How about calling on the name of the Lord?"));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}