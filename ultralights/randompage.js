
var links = new Array();
links[0] = "loremipsum.html";
links[1] = "someother.html";

function openLink() {
  // Chooses a random link:
  var i = Math.floor(Math.random() * links.length);
  // Directs the browser to the chosen target:
  parent.location = links[i];
  return false;
}
