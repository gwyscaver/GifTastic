var topics = ["hotel", "airplane", "beach", "palm tree", "airport"]

//create button for the page
function createButtons() {
    for (let i = 0; i < topics.length; i++) {
        var btn = $("<button>")
        btn.addClass("travelBtn")
        //jquery custom attributes for buttons
        btn.attr("data-type", topics[i])
        btn.text(topics[i])
        $(".buttonsDiv").append(btn)
    }
}
createButtons()




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


            $("resultsDiv").empty();
            for (let j = 0; j < gifs.length; j++) {
                var gifDiv = $("<div>");
                var gifRating = gifs[j].rating;
                var p = $("<p>").text("Rating: " + gifRating);
                var travelImage = $("<img>");
                travelImage.attr("src", gifs[j].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(travelImage);

                $(".resultsDiv").prepend(gifDiv);
                
            }
            
           
        });
});