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


let gifUrls = [];
let gifStills = [];


//listening to click on buttons
$(document).on("click", ".travelBtn", function (){
    //console.log("travel button clicked")
    var topic=$(this).attr("data-type")
    //console.log(topic)
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=nDOjknhqowdvI7SpOGOaEwLfq7treK7f",
        method: "GET"
      }).then(function(response) {
          let gifs = response.data;
          let resultCount = response.pagination.count;
          if(resultCount > 10) {
              resultCount = 10;
          }


          for(let i=0;i<resultCount;i++) {
              let gifUrl = gifs[i].images.fixed_height.url;
              let gifStill = gifs[i].images.fixed_height_still.url;
              let gifRating = gifs[i].rating;
              // gifs[i].rating will be its rating

              $(".resultsDiv").append("<div style='display: inline-block; width: 300px;' ><img src='" + gifStill + "' class='gif' data-state='still'><span class='caption'>" + gifRating + "</span></divL");

              gifUrls.push(gifUrl);
              gifStills.push(gifStill);
              
          }

          $(".gif").on("click", function() {
            console.log(gifUrls);
            console.log(gifStills);
            var state = $(this).attr("data-state");
            var url = $(this).attr("src");
            if(state === "still") {
                for(let i=0;i<gifStills.length;i++) {
                    if(gifStills[i] == url) {
                        let animatedSrc = gifUrls[i];
                        $(this).attr("src", animatedSrc);
                        $(this).attr("data-state", "animate");
                    }
                }
            } else {
                for(let i=0;i<gifUrls.length;i++) {
                    if(gifUrls[i] == url) {
                        let stillSrc = gifStills[i];
                        $(this).attr("src", stillSrc);
                        $(this).attr("data-state", "still");
                    }
                }
            } 
        
        


        })

      })
})



//calling GIPHY API
//nDOjknhqowdvI7SpOGOaEwLfq7treK7f 
