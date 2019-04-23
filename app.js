$(document).ready(function(){

    var heroes = ["Thor", "DeadPool", "Hulk"];
    
    //a function to make new buttons and add them to the page

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var heroButton = $("<button>");
            heroButton.addClass(classToAdd);
            heroButton.attr("data-type", arrayToUse[i]);
            heroButton.text(arrayToUse[i]);
            $(areaToAddTo).append(heroButton);
        }
    }

        
    
    //function for existing buttons
    $(document).on("click", ".hero-button", function() {
        $("#heroes").empty();
        $(".hero-button").removeClass("active");
        $(this).addClass("active");

        var hero = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=3py1RuALUF0LD8CYLusa9S90ghZ0LP1w&limit=1";

    //ajax request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            //storing the data from the AJAX request
            var results = response.data;

            //for loop to go through results and grab specific attributes
            for (var i = 0; i < results.length; i++) {
            //variables to hold divs created by gifs added to the page 
                var heroDiv = $("<div class=\"hero-item\">");
                //adding the rating data to each image
                var p = $("<p>").text("Rating: " + results[i].rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url; 



                var heroImage = $("<img>");
                heroImage.attr("src", still);
                heroImage.attr("data-still", still);
                heroImage.attr("data-animate", animated);
                heroImage.attr("data-state", "still");
                heroImage.addClass("hero-image");
                //adding the attributes to make the gifs animated or still

                heroDiv.append(heroImage);
                heroDiv.append(p);
                    

                $("#heroes").append(heroDiv);
            }
        });
    });

    $(document).on("click", ".hero-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      $("add-hero").on("click", function(event) {
          event.preventDefault();
          var newHero = $("input").eq(0).val();

          if (newHero.length > 2) {
              heroes.push(newHero);
          }

          populateButtons(heroes, "hero-button", "#hero-buttons");

      });

      populateButtons(heroes, "hero-button", "#hero-buttons");
    
});