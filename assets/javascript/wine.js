
            $("#Search").on("click", function() {
                var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=wine";
                // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    // seachfor + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                    .done(function(response) {

                        console.log(queryURL);

                        console.log(response);
                        // storing the data from the AJAX request in the results variable
                        var results = response.data;
                        var displaygif = "<img src=" + results.image_url + ">"
                    
                        $("#wineGiphy").html(displaygif);
                    })
                // fade out the gif
                //Need to reset or clear timer when button is pressed again
                setTimeout(function() {
                    $('#wineGiphy').fadeOut('slow');
                }, 3000);
            });