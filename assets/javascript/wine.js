    var jokes = [
            "funny joke number 1", // 0
            "funny joke number 2", // 1
            "funny joke number 3", // 2
        ]
    function newJoke() {
        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        console.log(randomJoke);
        $("#wineGiphy").append("<h3>" + randomJoke + "</h3>");
    }
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

                        newJoke();
                    })
                // fade out the gif
                //Need to reset or clear timer when button is pressed again
                setTimeout(function() {
                    $('#wineGiphy').fadeOut('slow');
                }, 3000);
            });