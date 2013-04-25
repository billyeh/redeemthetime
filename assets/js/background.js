chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  blocked_sites = JSON.parse(localStorage["blocked"]);
  for (var i = 0; i < blocked_sites.length; i++) {
    if (tab.url.indexOf(blocked_sites[i]) >= 0) {
      chrome.tabs.update(tab.id, {"url": "content.html"});
    }
  }
});

chrome.runtime.onInstalled.addListener(function (details) {
  localStorage["bible"] = 'http://online.recoveryversion.org/BibleChapters.asp?';
  localStorage["hymnal"] = 'http://hymn.aws.af.cm/hymn?';
  localStorage["radio"] = 'http://www.lsmradio.com/audio/';
  localStorage["blocked"] = JSON.stringify([] );
});