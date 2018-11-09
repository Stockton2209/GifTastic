$(document).ready(function(){
    //function for existing buttons
    $("button").on("click", function() {
        var hero = $(this).attr("name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=3py1RuALUF0LD8CYLusa9S90ghZ0LP1w&limit=5";
    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
        console.log(queryURL);
        console.log(response);
        
        });
    });
});
        
    




    // //button function for new heroes
    // //click event listener, capture data values into variable "hero", make a variable to hold the query url and work with each hero variable.
    // $("button").on("click", function() {
    //     var hero = $(this).attr("name");
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //         hero + "&api_key=3py1RuALUF0LD8CYLusa9S90ghZ0LP1w&limit=5";
    //     //ajax request
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //         })
    //         .then(function(response) {
    //         console.log(queryURL);
    //         console.log(response);
    //         }
    //     }
    //     // storing the data from the AJAX request
    //     var results = response.data;
    //     //for loop to go through results and grab specific attributes
    //     for (var i = 0; i < results.length; i++) {
    //     //variables and divs for when new heroes are summoned
    //         var heroDiv = $("<div>");
    //         var p = $("<p>").text("Rating: " + results[i].rating);
    //         var heroImage = $("<img>");
    //         heroImage.attr("src", results[i].images.fixed_height.url);
    //         heroDiv.append(p);
    //         heroDiv.append(heroImage);

    //         $("#gifs-go-here").prepend(heroDiv);
    // }