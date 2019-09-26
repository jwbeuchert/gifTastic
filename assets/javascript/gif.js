// Listing my arrays for the gifs
var cars = [
  "Ford",
  "Chevy",
  "Dodge",
  "Chrysler",
  "Pontiac",
  "Lincoln",
  "Buick",
  "Cadillac",
  "BMW",
  "Mercedes",
  "Audi",
  "Volvo",
  "Ferrari",
  "Porsche",
  "Lamborghini",
  "Hummer",
  "Range Rover",
  "Toyota",
  "Honda",
  "Jeep"
];

// displaycarInfo function now re-renders the HTML to display the appropriate content.
function displaycarInfo() {
  $("#carsView").empty();

  var car = $(this).attr("data-name");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    car +
    "&api_key=x3FcBHEQMBiGQgt7cjJIqt96n0TTg1HV&limit=10";

  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating == "r" || results[i].rating == "pg-13") {
      } else {
        console.log(response);

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var carImage = $("<img>");
        // Giving the images the still and moving features
        carImage.attr("src", results[i].images.fixed_height_still.url);
        carImage.attr("data-still", results[i].images.fixed_height_still.url);
        carImage.attr("data-animate", results[i].images.fixed_height.url);
        carImage.attr("data-state", "still");
        carImage.addClass("carImage");

        $("#carsView").append(p);
        $("#carsView").append(carImage);
      }
    }

    $(".carImage").on("click", function() {
      var state = $(this).attr("data-state");
      console.log(state);

      if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

function renderButtons() {
  $("#buttonsView").empty();

  for (var i = 0; i < cars.length; i++) {
    var a = $("<button>");
    a.addClass("car");
    a.addClass("btn btn-success");
    a.addClass("btn btn-primary btn-lg");
    a.attr("data-name", cars[i]);
    a.text(cars[i]);
    $("#buttonsView").append(a);
  }
}

// This function handles events when the button is clicked
$("#addcar").on("click", function() {
  var car = $("#car-input")
    .val()
    .trim();

  cars.push(car);

  renderButtons();

  return false;
});

$(document).on("click", ".car", displaycarInfo);

renderButtons();
