$(document).ready(function() {
  generateRandomContent();
  fillModal();

  /*$('#modal-verse-type').bind('paste', function(event) {
    event.preventDefault();
  });*/

});

function fillModal() {
  var chapter = randInt(1188) + 1;
  var verses = [];
  var rand;
  $.getJSON(localStorage["verses"].replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString()), function(data) {
    for (var i = 0; i < data.query.results.p.length; i++) {
      verses.push(data.query.results.p[i]);
    }
    rand = randInt(verses.length);
    var chosenVerse = verses[rand];
    $("#modal-instructions")
        .after($('<p></p>')
        .text(chosenVerse)
        .attr("id", "modal-verse"));
    $("#modal-check").click(function() {
      var typed = $("#modal-verse-type").val();
      if (chosenVerse.slice(1) === typed) {
        //redirect
      }
    });
  });

  var book_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20content%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3DZZ%26lcid%3DZZ%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B%40id%3D'container'%5D%2Fdiv%5B%40id%3D'content'%5D%2Fh1%5B%40class%3D'book'%5D%22&format=json&diagnostics=true".replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString());
  var books = JSON.parse(localStorage["books"]);
  var chapter_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3DZZ%26lcid%3DZZ%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B%40id%3D'container'%5D%2Fdiv%5B%40id%3D'content'%5D%2Fh4%5B%40class%3D'chapter'%5D%22&format=json&diagnostics=true".replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString());
  $.getJSON(book_query, function(data) {
    var book = data.query.results.h1;
    for (var i = 0; i < books.length; i++) {
      if (book.toLowerCase().indexOf(removeNumbers(books[i].toLowerCase())) >= 0) {
        book = (books[i]);
      }
    }
    $.getJSON(chapter_query, function(data) {
      $("#modal-verse")
          .after($('<p></p>')
              .text(book + ' ' + data.query.results.h4.content.split(' ')[1] + ":" + rand)
              .attr({style: "float: right", href: "http://online.recoveryversion.org/BibleChapters.asp?fcid=34&lcid=34".replace("34", chapter).replace("34", chapter)}));
    });
  });

}

function generateRandomContent() {
  // Random generator;
  var rand = randInt(4);
  if (rand == 0) {
    getHymn(true);
  } else if (rand == 1) {
    getVerse();
  } else if (rand == 2) {
    getRadio();
  } else {
    getActivity();
  }
}

function getHymn(firstTime) {
  var realHymn = true;
  if (firstTime) {
    $("#title")
      .after('<h3>Enjoy a hymn! &nbsp;&nbsp;</h3>');
  }
  localStorage["playing"] = 'false';
  var randomType = randInt(384 + 87 + 1360 + 164);
  var type;
  var number;
  if (randomType <= 384) {
    type = 'ns';
    number = randInt(383) + 1;
  } else if (randomType <= 384 + 1360) {
    type = 'h';
    number = randInt(1359) + 1;
  } else if (randomType <= 384 + 1360 + 87) {
    type = 'lb';
    number = randInt(86) + 1;
  } else {
    type = 'c';
    number = randInt(163) + 1;
  }

  $("h3").after('<ol id="lyrics"></ol>');

  var hymn_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fhymn.aws.af.cm%2Fhymn%3Fhymn%3DYY%26type%3DZZ%22&format=json&diagnostics=true";
  $.getJSON(hymn_query.replace("YY", number).replace("ZZ", type), function(data) {
    try {
      var lyrics = JSON.parse(data.query.results.body.p);
    } catch(err) {
      getHymn(false);
      realHymn = false;
    }
    if (realHymn) {
      var formattedLyrics = [];
      for (var i = 0; i < lyrics.length; i++) {
        formattedLyrics.push(replaceAll("\n", "<br />", lyrics[i]));
      }
      for (var i = 0; i < lyrics.length; i++) {
        if (formattedLyrics[i].indexOf("chorus") == 0) {
          var chorus = '<dl><dd>' + formattedLyrics[i].slice(lyrics[i].indexOf(" ")) + "<dd></dl>";
          $("#lyrics").append(chorus);
        } else {
          $("#lyrics").append("<li>" + formattedLyrics[i].slice(lyrics[i].indexOf(" ")) + "</li>");
        }
      }
      var mp3_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20href%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.hymnal.net%2Fhymn.php%2F" + type + "%2F" + number + "%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%5B%40class%3D'home'%5D%2Fdiv%5B%40id%3D'pagewrap'%5D%2Fdiv%5B%40id%3D'body'%5D%2Fdiv%5B%40id%3D'layout'%5D%2Fdiv%5B%40id%3D'sidebar'%5D%2Fdiv%5B%40class%3D'widgetwrap'%5D%5B4%5D%2Fdiv%5B%40class%3D'widget%20downloads'%5D%2Ful%5B%40class%3D'list'%5D%2Fli%5B2%5D%2Fa%5B1%5D%22&format=json&diagnostics=true";
      $.getJSON(mp3_query, function(data) {
        $("h3")
            .append('<div class="play_border"><div class="play_button"></div></div>');
        $("h3")
            .append('<audio id="audio"></audio>');
        $("#audio")
            .append('<source src="' + data.query.results.a.href + '"></source>');
        $("div.play_border").on('click', function() {
          if (localStorage["playing"] == 'false') {
            $("#audio").trigger("play");
            localStorage["playing"] == 'true';
          }
        });
        $("ol")
            .after($('<a></a>')
            .text("Hymn from Hymnal.Net")
            .attr({href: "http://www.hymnal.net/hymn.php/h/" + number}));
      });
    }
  });
}

function getVerse() {
  $("#title")
    .after($("<h3></h3>")
    .text("Try praying and reading over these verses.")
    .attr("id", "instructions"));
  
  var chapter = randInt(1188) + 1;
  var verses = [];
  $.getJSON(localStorage["verses"].replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString()), function(data) {

    for (var i = 0; i < data.query.results.p.length; i++) {
      verses.push(data.query.results.p[i]);
    }
    var chosen = [];
    var firstVerse = Math.abs(randInt(verses.length - 5));
    for (var i = firstVerse; i < randInt(3) + 2 + Math.abs(firstVerse); i++) {
      chosen.push(verses[i]);
    }

    $("#instructions")
        .after($("<ol></ol>")
        .attr({start: (firstVerse + 1).toString(), id: "verses"}));
    for (var i = 0; i < chosen.length; i++) {
      $("#verses")
          .append('<li>' + chosen[i] + '</li>');
    }

  });
  var book_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20content%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3DZZ%26lcid%3DZZ%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B%40id%3D'container'%5D%2Fdiv%5B%40id%3D'content'%5D%2Fh1%5B%40class%3D'book'%5D%22&format=json&diagnostics=true".replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString());
  var books = JSON.parse(localStorage["books"]);
  var chapter_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fonline.recoveryversion.org%2FBibleChapters.asp%3Ffcid%3DZZ%26lcid%3DZZ%22%20AND%20xpath%3D%22%2Fhtml%2Fbody%2Fdiv%5B%40id%3D'container'%5D%2Fdiv%5B%40id%3D'content'%5D%2Fh4%5B%40class%3D'chapter'%5D%22&format=json&diagnostics=true".replace("ZZ", chapter.toString()).replace("ZZ", chapter.toString());
  $.getJSON(book_query, function(data) {
    var book = data.query.results.h1;
    for (var i = 0; i < books.length; i++) {
      if (book.toLowerCase().indexOf(removeNumbers(books[i].toLowerCase())) >= 0) {
        book = (books[i]);
      }
    }
    $.getJSON(chapter_query, function(data) {
      $("#verses")
          .after($('<a></a>')
              .text(book + ' ' + data.query.results.h4.content.split(' ')[1])
              .attr({style: "float: right", href: "http://online.recoveryversion.org/BibleChapters.asp?fcid=34&lcid=34".replace("34", chapter).replace("34", chapter)}));
    });
  });

}

function getRadio() {
  $("#title")
    .after($("<h3></h3>")
    .text("Listen to a radio broadcast of a message.")
    .attr("id", "instructions"));
  var books = JSON.parse(localStorage["bible_books"]);
  var book = books[randInt(books.length)];
  var radio_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.lsmradio.com%2Faudio%2Fgenesis.html%22%20and%20xpath%3D%22%2F%2Fa%22&format=json&diagnostics=true"
  var mp3s = [];
  $.getJSON(radio_query, function(data) {
    for (var i = 0; i < data.query.results.a.length; i++) {
      if (endsWith(data.query.results.a[i].href, '.mp3')) {
        mp3s.push(data.query.results.a[i].href);
      }
    }
    var mp3 = mp3s[randInt(mp3s.length)];
    $("#instructions")
      .after($("<audio controls></audio>")
      .attr("id", "audio"));
    $("#audio")
      .append($("<source></source>")
      .attr({src: mp3, id: "radio"}));
    $("audio")
      .after($("<p></p>")
      .text("Radio Broadcast on " + formatBook(book) + " from ")
      .attr({style: "float: right", id: "credit"}));
    $("#credit")
      .append($("<a></a>")
      .text("LSM")
      .attr({href: "http://www.lsmradio.com/rad_archives.html", target: "_blank"}));
  });
}

function getActivity() {
  $("#title")
    .after($("<h3></h3>")
    .text("How about calling on the name of the Lord?"));
  $("h3")
    .after($("<p></p>")
    .text("In my distress I called upon the Lord, and cried unto my God: he heard my voice out of his temple, and my cry came before him, even into his ears.")
    .attr({style: "font-style:italic", id: "verse"}));
  $("#verse")
    .after($("<p></p>")
    .text("Psalm 18:6, KJV")
    .attr("style", "float: right"));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatBook(string) {
  if (string.indexOf("samuel") >= 0) {
    return string.charAt(0) + " Samuel";
  } else if (string.indexOf("minor") >= 0) {
    return "Minor Prophets";
  } else if (string.indexOf("corinthians") >= 0) {
    return string.charAt(0) + " Corinthians";
  } else if (string.indexOf("kings") >= 0) {
    return string.charAt(0) + " Kings";
  } else if (string.indexOf("thessalonians") >= 0) {
    return "1 and 2 Thesselonians";
  } else if (string.indexOf("timothy") >= 0) {
    return "1 and 2 Timothy";
  } else if (string.indexOf("peter") >= 0) {
    return "1 and 2 Peter";
  } else if (string.indexOf("john") >= 0) {
    return "1, 2 and 3 John";
  }
  return capitalizeFirstLetter(removeNumbers(string));
}

function capitalizeFirstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeNumbers(string) {
  return string.replace(/[0-9]/g, '');
}

function replaceAll(oldCharacter, newCharacter, string) {
  while (string.indexOf(oldCharacter) >= 0) {
    string = string.replace(oldCharacter, newCharacter);
  }
  return string;
}