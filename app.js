var topics = ["hotel", "motel", "airplane", "beach", "palm tree", "airport", "tourist", "crying kids", "florida", "beach towel", "camping"];

//create button for the page
function createButtons() {
    $(".buttonsDiv").empty(); 
    for (let i = 0; i < topics.length; i++) {
        var btn = $("<button>")
        btn.addClass("travelBtn")
        //jquery custom attributes for buttons
        btn.attr("data-type", topics[i])
        btn.text(topics[i])
        $(".buttonsDiv").append(btn)
    }
}
    $("#add-gif").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();
    
      // This line will grab the text from the input box
      var inputGif = $("#travel-input").val().trim();
      // The gif input from the textbox is then added to our array
      topics.push(inputGif);
    
      // calling renderButtons which handles the processing of our movie array
      createButtons();
    });

createButtons();

//listening to click on buttons
$(document).on("click", ".travelBtn", function () {
    //console.log("travel button clicked")
    var topic = $(this).attr("data-type")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=nDOjknhqowdvI7SpOGOaEwLfq7treK7f&limit=10";
    //console.log(topic)
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var gifs = response.data;
        
        //console.log(gifs);
        $(".resultsDiv").empty();
            for (let j = 0; j < gifs.length; j++) {
                var gifDiv = $("<div>");
                var gifRating = gifs[j].rating;
                var p = $("<p>").text("Rating: " + gifRating);
                var travelImage = $("<img>");
                // console.log(gifs[j].images.fixed_height_still.url);
                travelImage.attr("src", gifs[j].images.fixed_height_still.url)
                .attr("data-animate", gifs[j].images.fixed_height.url)
                .attr("data-still", gifs[j].images.fixed_height_still.url)
                .attr("data-state", "still");

                gifDiv.prepend(p);
                gifDiv.prepend(travelImage);

                $(".resultsDiv").prepend(gifDiv);
                
                travelImage.addClass ("gifPic")
                
            }      
        });
});

$(document).on("click", ".gifPic",function (){
    var state = $(this).attr("data-state");
    if(state === "still") {
        var animatedSrc = $(this).attr("data-animate");
          $(this).attr("src", animatedSrc);
          $(this).attr("data-state", "animate");
          } else {
            var stillSrc = $(this).attr("data-still");
            $(this).attr("src", stillSrc);
            $(this).attr("data-state", "still");
          } 

});
 
