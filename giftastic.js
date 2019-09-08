var topics = ["hotels", "airplanes", "beaches", "palm trees", "airports"]

//create button for the page
function createButtons (){
for (let i = 0; i < topics.length; i++) {
    var btn = $("<button>")
    btn.addClass("travelBtn")
    //jquery custom attributes for buttons
    btn.attr("data-type", topics[i])
    btn.text(topics[i])
    $(".buttonsDiv").append(btn)
}
}
createButtons ()

//listening to click on buttons
$(document).on("click", ".travelBtn", function (){
    //console.log("travel button clicked")
    var topic=$(this).attr("data-type")
    console.log(topic)
})

//calling GIPHY API
//nDOjknhqowdvI7SpOGOaEwLfq7treK7f 

