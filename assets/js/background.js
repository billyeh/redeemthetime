// Include JQuery
var script = document.createElement('script');
script.src = '../assets/js/jquery-1.9.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

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
  localStorage["blocked"] = JSON.stringify([]);

  bible_books_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20value%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.lsmradio.com%2Frad_archives.html%22%20and%20xpath%3D%22%2F%2Foptgroup%2Foption%22&format=json&diagnostics=true"
  bible_books = [];
  $.getJSON(bible_books_query, function(data) {
    for (var i = 0; i < data.query.results.option.length; i++) {
      bible_books.push(data.query.results.option[i].value);
    }
    localStorage["bible_books"] = JSON.stringify(bible_books);
  });
  
});