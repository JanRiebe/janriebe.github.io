
var links = new Array();
links[0] = "loremipsum.html";
links[1] = "30000.html";
links[2] = "hawk_in_the_morning_mist.html";

function openLink() {
  // Chooses a random link:
  var i = Math.floor(Math.random() * links.length);
  // Directs the browser to the chosen target:
  parent.location = links[i];
  return false;
}
