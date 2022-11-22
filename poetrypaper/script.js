/*
$('#answer-example-share-button').on('click', () => {
    if (navigator.share) {
      navigator.share({
          title: 'Web Share API Draft',
          text: 'Take a look at this spec!',
          url: 'https://wicg.github.io/web-share/#share-method',
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Share not supported on this browser, do it the old way.');
    }
  });




html2canvas(document.querySelector("#capture")).then(canvas => {
    document.body.appendChild(canvas)
});

*/
function savePic() {
    html2canvas(document.body).then(function(canvas) {
        //document.body.appendChild(canvas);
        var anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "IMAGE.PNG";
        anchor.click(); 

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var text = $(this).attr("data-text");
            var url = $(this).attr("data-link");
            var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
            var whatsapp_url = "whatsapp://send?text=" + message;
            window.location.href = whatsapp_url;
          } else {
            alert("Please use an Mobile Device to Share this Article");
          }
    });
    
}

$(document).ready(function() {
    $(document).on("click", '.mct_whatsapp_btn', function() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var text = $(this).attr("data-text");
        var url = $(this).attr("data-link");
        var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
        var whatsapp_url = "whatsapp://send?text=" + message;
        window.location.href = whatsapp_url;
      } else {
        alert("Please use an Mobile Device to Share this Article");
      }
    });
  });

