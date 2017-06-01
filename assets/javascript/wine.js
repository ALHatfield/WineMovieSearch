    var jokes = [
            "funny joke number 1", // 0
            "funny joke number 2", // 1
            "funny joke number 3", // 2
        ]

    var timer = null;
    function newJoke() {
        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        console.log(randomJoke);
        $("#wineGiphy").append("<h3>" + randomJoke + "</h3>");
    }
            $("#Search").on("click", function() {
                
            //Resets the previous timer
                if (timer) {
                    clearTimeout(timer); 
                    timer = null;
                }

                var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=wine";

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
                        

                        $('#wineGiphy').fadeIn('fast');

                        newJoke();
                    })
                // fade out the gif
                timer = setTimeout(function() {
                    $('#wineGiphy').fadeOut('slow');
                }, 3000);
                
               timer; 

            });
