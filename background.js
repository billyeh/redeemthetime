chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  blocked_sites = JSON.parse(localStorage["blocked"]);
  for (var i = 0; i < blocked_sites.length; i++) {
    if (tab.url.indexOf(blocked_sites[i]) >= 0) {
      console.log(tab.url);
      chrome.tabs.update(tab.id, {"url": "content.html"}, function() {
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
      });
    }
  }
});

chrome.runtime.onInstalled.addListener(function (details) {
  localStorage["bible"] = 'http://online.recoveryversion.org/BibleChapters.asp?';
  localStorage["hymnal"] = 'http://hymn.aws.af.cm/hymn?';
  localStorage["radio"] = 'http://www.lsmradio.com/audio/';
  localStorage["blocked"] = JSON.stringify([] );
});

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