$(document).ready(function function_name(argument) {
    // body...
    // var seachfor = "wine";
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=wine";
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        // seachfor + "&api_key=dc6zaTOxFJmzC&limit=10";

	var displaygif ="";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {

            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            var displaygif = "<div id='showGiphy'>" + "<img src=" + results.image_url + ">" + "</div>"
        
            $("#wineGiphy").append(displaygif);
            toggleWineGiphy(false);   
        })

     

    // $("#Search").on("click", function() {
    //     // Performing an AJAX request with the queryURL
    //     toggleWineGiphy(true);

    // });
            $("#Search").on("click", function() {
                // Performing an AJAX request with the queryURL
                toggleWineGiphy(true);
                // fade out the gif
                setTimeout(function() {
                    $('#wineGiphy').fadeOut('slow');
                }, 3000);
            });

    function toggleWineGiphy(isDisplay)
    {
       if(isDisplay === true)
       	   $("#wineGiphy").show();
       else
          $("#wineGiphy").hide();
    }
})
