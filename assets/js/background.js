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

  localStorage["blocked"] = JSON.stringify([]);

  bible_books_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20value%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.lsmradio.com%2Frad_archives.html%22%20and%20xpath%3D%22%2F%2Foptgroup%2Foption%22&format=json&diagnostics=true"
  bible_books = [];
  $.getJSON(bible_books_query, function(data) {
    for (var i = 0; i < data.query.results.option.length; i++) {
      bible_books.push(data.query.results.option[i].value);
    }
    localStorage["bible_books"] = JSON.stringify(bible_books);
  });

  localStorage["verses"] = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20content%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3DZZ%26lcid%3DZZ%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B%40id%3D'container'%5D%2Fdiv%5B%40id%3D'content'%5D%2Fp%5B%40class%3D'verses'%5D%22&format=json&diagnostics=true"

  books_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3D110%26lcid%3D110%22%20AND%20xpath%3D%22%2F%2Fselect%22&format=json&diagnostics=true";
  books = [];
  $.getJSON(books_query, function(data) {
    for (var i = 1; i < data.query.results.select.option.length; i++) {
      books.push(data.query.results.select.option[i].content);
    }
    localStorage["books"] = JSON.stringify(books);
  });
});