$(document).ready(function(){

    var topics = ["Thor", "DeadPool", "Hulk"];
    //Try using a loop that appends a button for each string in the array.
    for (var i = 0; i < topics.length; i++) {
        var heroButton = $("<button>" + topics[i]);
        $("#buttonrow").append(heroButton);
        // heroButton.addClass("data-hero");
         heroButton.text(topics[i]);
        
        //still need to get the query search to match up with the buttons as they're created from the array.  Keeps saying "undefined"
        
    }
    //function for existing buttons
    $("button").on("click", function() {
        var hero = $(this).attr("data-hero");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=3py1RuALUF0LD8CYLusa9S90ghZ0LP1w&limit=1";
    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);
            
            //storing the data from the AJAX request
            var results = response.data;
            //for loop to go through results and grab specific attributes
            for (var i = 0; i < results.length; i++) {
            //variables to hold divs created by gifs added to the page 
                var heroDiv = $("<div>");
            //adding the rating data to each image
                var p = $("<p>").text("Rating: " + results[i].rating);
                var heroImage = $("<img>");
                heroImage.attr("src", results[i].images.fixed_height.url);
            //adding the attributes to make the gifs animated or still
                heroImage.attr("data-stil", results[i].images.fixed_height.url);
                heroImage.attr("data-animate", results[i].images.fixed_height.url);
                heroDiv.append(heroImage);
                heroDiv.append(p);
                

                $("#gifs-go-here").prepend(heroDiv);
            }
        });
    });


    //function to render new buttons
        //take search input and add it to the topics array
        //have it create a new button

    //create a function to check/alter the data-state of each image
        //make variables to assign the data state value, the still value and the animated value
        //use if/else statements to change between the two states when clicked

    //also still need to link this whole thing to my portfolio
    
    

    
});