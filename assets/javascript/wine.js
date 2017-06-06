    //To do: Change gif to fixed height size.
    //Ensure that the omdb api works and puts content on page    

    var jokes = [
            "Searching our wine racks ... sit tight", // 0
            "OK hold on this may take a while", // 1
            "Really? that movie? we probably don't have it", // 2
            "No sorry we only have good movies",
            "How about you get me more wine first",
            "Whos idea was this that I have to do work",
            "Didn't that movie flop?",
            "This is what people watch nowadays? wow",
            "Come back later I'm drinking wine",
            "I have a better idea .. ",
            "What is my purpose? (You pass butter) ... omg ..."
        ]


    var timer = null;
    var releaseYear = "";
    var movieSearch = "";

    //functions to define

    function newJoke() {
        var randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        console.log(randomJoke);
        $("#wineGiphy").append("<h3>" + randomJoke + "</h3>");
    }


    function gifAJAX() {

        console.log($(".form-control").val());
        if ($(".form-control").val() === "") {
            console.log("Insert a movie first!");

        }
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
            //First remove all classes then add class of col div so that it is col-md-6 instead of col-md-4
        }, 3000);

        timer;
    }

    function omdbAJAX() {

        var movie = $(".form-control").val();
        if (movie === "") {
            alert("Insert a movie first!");

        }
        console.log(movie);
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            console.log(response.Actors);

            var poster_src = response.Poster
            $("#movieInfo").html("<img class='img-responsive' src='" + response.Poster + "' >");
            $("#moviePlot").html("<p class='moviePlotText'> " + JSON.stringify(response.Plot, null, 2) + "</p>");
            $("#moviePlot").css("color", "darkblue");

            var fontSizes = [14, 16];
            $('#moviePlot').click(function() {
                $('#moviePlot').css('font-size', fontSizes[0] + 'pt');
                fontSizes.reverse();
            })
        });
        return;

    }


    function youtubeData() {
        //disambiguation by year of release is defined with another ajax call to omdb, followed by extraction of year of release
        var movie = $(".form-control").val();
        console.log(movie);
        if (movie === "") {
            alert("Insert a movie first!");

        }
        var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            console.log(response.Actors);
            releaseYear = response.Year;

            var searchURL = "https://www.youtube.com/embed?listType=search&list=";
            movieSearch = $(".form-control").val() + "+" + releaseYear + "+trailer";
            var targetURL = searchURL + movieSearch;
            console.log(movieSearch);
            console.log(targetURL);
            //Code below prevents youtube trailer from displaying if there is no user input or if user decides to type in gibberish
            if (releaseYear == undefined) {
                return false;
            } else if (movieSearch == "+trailer") {
                return false;
            } else {
                $("#youtube").append("<iframe class='embed-responsive-item' id='trailer'></iframe");
                $("#trailer").attr("src", targetURL);
            }

        });

    }

    function emptyDiv() {
        $("#movieInfo").empty();
        $("#moviePlot").empty();
        $("#youtube").empty();
    }


    $(".form-control").keypress(function(e) {
        if (e.which == 13) {

            emptyDiv();

            gifAJAX();

            setTimeout(function() {
                omdbAJAX();
            }, 4000);

            setTimeout(function() {
                youtubeData();
            }, 4000);

        }
    });

    $("#Search").on("click", function() {

        emptyDiv();

        gifAJAX();

        setTimeout(function() {
            omdbAJAX();
        }, 4000);

        setTimeout(function() {
            youtubeData();
        }, 4000);

    });