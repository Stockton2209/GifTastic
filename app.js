$(document).ready(function(){

    var villains = ["Thanos", "Loki", "Ronan", "Red Skull"];
    
    //a function to make new buttons and add them to the page

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

        
    
    //function for existing buttons
    $(document).on("click", ".villain-button", function() {
        $("#villains").empty();
        $(".villain-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            type + "&api_key=3py1RuALUF0LD8CYLusa9S90ghZ0LP1w&limit=10";

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
                var villainDiv = $("<div class=\"villain-item\">");
                
                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url; 



                var villainImage = $("<img>");

                villainImage.attr("src", still);
                villainImage.attr("data-still", still);
                villainImage.attr("data-animate", animated);
                villainImage.attr("data-state", "still");
                villainImage.addClass("villain-image");
                //adding the attributes to make the gifs animated or still

                villainDiv.append(p);
                villainDiv.append(villainImage); 

                $("#villains").append(villainDiv);
            }
        });
    });

    $(document).on("click", ".villain-image", function() {

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

      // have the summon button find new villains
      $("#add-villain").on("click", function(event) {
          event.preventDefault();
          var newVillain = $("input").eq(0).val();

          if (newVillain.length > 2) {
              villains.push(newVillain);
          }

          populateButtons(villains, "villain-button", "#villain-buttons");

      });

      populateButtons(villains, "villain-button", "#villain-buttons");
    
});