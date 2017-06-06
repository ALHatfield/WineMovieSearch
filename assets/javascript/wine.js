//To do: Change gif to fixed height size.
//Ensure that the omdb api works and puts content on page    

var jokes = [
    "funny joke number 1", // 0
    "funny joke number 2", // 1
    "funny joke number 3", // 2
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
    console.log(movie);
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        console.log(response.Actors);

        var poster_src = response.Poster
        $("#movieInfo").html("<img src='" + response.Poster + "' height=360 >");
        $("#moviePlot").html(JSON.stringify(response.Plot, null, 2));
        $("#moviePlot").css("color", "darkblue");
        $("#moviePlot").one("click", function() {
            var fontSize = $(this).css("font-size", "+=15");
        });
    });
    return;

}


function youtubeData() {
    //disambiguation by year of release is defined with another ajax call to omdb, followed by extraction of year of release
    var movie = $(".form-control").val();
    console.log(movie);
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
            $("#youtube").append("<iframe id='trailer' width='640' height='360'></iframe");
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

        if($(".form-control").val() == "")
            return;
        e.preventDefault();

        gifAJAX();

        setTimeout(function() {
            omdbAJAX();
        }, 4000);

        setTimeout(function() {
            youtubeData();
        }, 4000);

    }
});

$("#Search").on("click", function(e) {
     emptyDiv();

     if($(".form-control").val() == "")
        return;

    e.preventDefault();
    

    gifAJAX();

    setTimeout(function() {
        omdbAJAX();
    }, 4000);

    setTimeout(function() {
        youtubeData();
    }, 4000);

});
