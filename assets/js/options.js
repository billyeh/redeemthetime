$(document).ready(function() {

  loadSites();
  // Add a site to be blocked
  $("#add-site").click(function() {
    var adds = $("#add-sites").val().trim().replace(new RegExp("\n+", "g"), "\n").split('\n');
    var current = JSON.parse(localStorage["blocked"]);
    for (var i = 0; i < adds.length; i++) {
      if (adds[i].trim() != '' && !inArray(current, adds[i])) {
        current.push(adds[i]);
      }
    }
    localStorage["blocked"] = JSON.stringify(current);
    $("#add-sites").val('');
    loadSites();
  });

  // Remove a site from being blocked
  $("#remove-site").click(function() {
    var unselected = [];
    $("option").not(':selected').each(function () {
      unselected.push($(this).text());
    });
    $("option:selected").remove();
    localStorage["blocked"] = JSON.stringify(unselected);
  });

  // Add page to blocked sites list
  $("#block-page").click(function() {
    var blocked = JSON.parse(localStorage["blocked"]);
    chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
      blocked.push(tabs[0].url);
      localStorage["blocked"] = JSON.stringify(blocked);
    });
  });

  // Go to options page
  $("#open-options").click(function() {
    chrome.tabs.create({"url": "../options.html"});
  });
  
});

function inArray(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      return true;
    }
  }
  return false;
}

function loadSites() {
  // Load blocked sites into box on right
  for (var i = 0; i < JSON.parse(localStorage["blocked"]).length; i++) {
    $("#blocked-sites")
      .append($("<option></option>")
      .attr("value",key)
      .text(JSON.parse(localStorage["blocked"])[i]));
  }
}