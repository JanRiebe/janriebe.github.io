

function getRandomContent(keyword) {

    allContent = null;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      allContent = JSON.parse(this.responseText);
    }
    xmlhttp.open("GET", "content.json");
    xmlhttp.send();

    if(allContent==null)
        return "content not found";

    var i = Math.floor(Math.random() * allContent.length);
    return allContent[i][keyword];

}
