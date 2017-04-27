// The URL to the google sheet
// var url = "https://spreadsheets.google.com/feeds/cells/1KfOpMynmsO-k9fxHffjzWSnhLrEPK7KcsZHNL-hoxX8/od6/public/values?alt=json";

// The URL to the google sheet
var start = "https://spreadsheets.google.com/feeds/cells/";
// var key = "1KfOpMynmsO-k9fxHffjzWSnhLrEPK7KcsZHNL-hoxX8";
var key = "1lHfOypE-S4-NwzEM93hfxgeYWl2_NqamLkabKPPN-Z4";
var query = "/od6/public/values?alt=json";
var url = start + key + query;

// JSON query
// function expects data.feed.entry
// where entry is an array of objects with each object having
// object.title.$t   and    object.content.$t
$.getJSON(url, function(data) {
  console.log(data);
  var entries = data.feed.entry;
  var entry = entries[0].content.$t;
  // populate locations array with contents of column "B"
  var cities = [];
  var countries = [];
  var dates = [];
  var links = [];
  for (var i=0; i<entries.length;i++) {
    if (entries[i].title.$t.includes("B")) {
      cities.push(entries[i].content.$t);
    }
    if (entries[i].title.$t.includes("C")) {
      countries.push(entries[i].content.$t);
    }
    if (entries[i].title.$t.includes("D")) {
      dates.push(entries[i].content.$t);
    }
    if (entries[i].title.$t.includes("F")) {
      links.push(entries[i].content.$t);
    }
  }
  var N = cities.length-1;
  var output = "<ul><li>Currently in: ";
  output += "<a href=\"" + links[N] + "\">"
  output += cities[N] + " ," + countries[N];
  output += "</a>"
  output += "      "
  output += "&nbsp;&nbsp;&nbsp;&nbsp;( Last updated: " + dates[N] + ")";
  output += "</li></ul>"
  // write last element in list to "p1"
  document.getElementById("location display").innerHTML = output;
});
