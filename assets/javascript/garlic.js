// when submit button is clicked on search page
$("#submit-search").on("click", function() {
	// edamam api
	// grabbing search vals from input boxes/search bar
	var foodSearch = $("#search").val().trim();
	var healthSearch = $("#health").val();
	var dietSearch = $("#diet").val();
	// 4 results
	var numberResults = 4;
	// initialize query URL
	var queryURL = "";

	// if statement for determining which query url to use
	// if health/diet selected as none...
	if (healthSearch === "" && dietSearch === "") {
		queryURL = "https://api.edamam.com/search?q=" + foodSearch
		+ "&from=0&to=" + numberResults;
		// if health is selected but diet is not
	} else if (healthSearch != "" && dietSearch === "") {
		queryURL = "https://api.edamam.com/search?q=" + foodSearch
		+ "&health=" + healthSearch + "&from=0&to=" + numberResults;
		// if diet is selected but health is not
	} else if (healthSearch === "" && dietSearch != "") {
		queryURL = "https://api.edamam.com/search?q=" + foodSearch 
		+ "&diet=" + dietSearch +"&from=0&to=" + numberResults;
		// if both diet and health is selected
	} else if (healthSearch != "" && dietSearch != "") {
		queryURL = "https://api.edamam.com/search?q=" + foodSearch
		+ "&health=" + healthSearch + "&diet=" + dietSearch 
		+"&from=0&to=" + numberResults;
	}

	// jquery ajax method
	$.ajax({
	    url: queryURL,
	    method: "GET"
	})
	// after data comes back from request
	.done(function(response) {
		// logs response
		console.log(response);
		// if search populates no recipes
		if (response.hits.length === 0) {
			$(".recipes-1").text("No recipes found, please search again. " 
				+ "If not filtering by health or diet labels, please select 'None'.");
		} // if search populates recipes
		else {
			// saving response hits as variable
			var data = response.hits;
			// clearing html for recipes-1 and recipes-2
			$(".recipes-1").html("");
			$(".recipes-2").html("");
			// creating a function to display recipe data in a card
			var createCard = function() {
				// writing to browser
				// creating card div
				var card = $("<div>");
				card.addClass("card");
				// creating card image div
				var cardImage = $("<div>");
				cardImage.addClass("card-image");
				// creating recipe image equal to response image
				var recipePic = $("<img>");
				recipePic.attr("src", data[i].recipe.image);
				// creating div for card title and info
				var cardText = $("<div>");
				cardText.addClass("card-title");
				// creating card title equal to recipe name
				var cardTitleDiv = $("<div>");
				cardTitleDiv.addClass("recipe-name");
				var cardTitle = $("<span>");
				cardTitle.text(data[i].recipe.label);
				cardTitleDiv.append(cardTitle);
				// creating page break
				var pageBreak = $("<br>");
				// creating serving info title
				var servingInfo = $("<span>");
				servingInfo.addClass("recipe-info");
				servingInfo.text("Serves: " + data[i].recipe.yield);
				// creating calorie info title
				var calorieInfo = $("<span>");
				calorieInfo.addClass("recipe-info");
				calorieInfo.text("Calories: " + 
					Math.round(data[i].recipe.calories/data[i].recipe.yield));
				// appending card title, breaks, and recipe info to card text
				cardText.append(cardTitleDiv);
				cardText.append(servingInfo);
				cardText.append(pageBreak);
				cardText.append(calorieInfo);
				// appending recipe pic and title to card image div
				cardImage.append(recipePic);
				cardImage.append(cardText);
				// appending card Image div to card div
				card.append(cardImage);
				// creating card content div
				var cardContent = $("<div>");
				cardContent.addClass("card-content");
				// appending card content to card div
				card.append(cardContent);
				// creating card action div
				var cardAction = $("<div>");
				cardAction.addClass("card-action");
				// creating link equal to recipe link, opening link in new
				// tab, giving it text, appending to card action
				var recipeLink = $("<a>");
				recipeLink.attr("href", data[i].recipe.shareAs);
				recipeLink.attr("target", "_blank");
				recipeLink.text("Make this recipe!");
				cardAction.append(recipeLink);
				// var break
				var pageBreak = $("<br>");
				cardAction.append(pageBreak);
				// add to list link with data count attribute equal to #ingredients
				var addToList = $("<a>");
				addToList.addClass("add-to-list");
				addToList.attr("href", "#");
				addToList.attr("data-count", data[i].recipe.ingredientLines.length);
				addToList.text("Add to shopping list");
				cardAction.append(addToList);
				// creating a paragraph and appending to card content for
				// each ingredient. also giving data-ing-i attr for each ingredient
				// to the addToList link
				for (var j = 0; j < data[i].recipe.ingredientLines.length; j++) {
					var ingredient = $("<p>");
					ingredient.addClass("ingredient");
					ingredient.text(data[i].recipe.ingredientLines[j]);
					cardContent.append(ingredient);
					addToList.attr("data-ing-" + j, data[i].recipe.ingredientLines[j]);
				}				
				// appending card action to card div
				card.append(cardAction);
				// appending card div to column
				column.append(card);
			};

			// for loop for the first 2 recipes to add to first recipe row
			for (var i = 0; i < 2; i++) {
				// creating column div with materialize size
				var column = $("<div>");
				column.addClass("col s6");
				// running create card function
				createCard();
				// appending column to recipes div
				$(".recipes-1").append(column);
			}

	    // for loop for the last 2 recipes to add to first recipe row
			for (var i = 2; i < 4; i++) {
				// creating column div with materialize size
				var column = $("<div>");
				column.addClass("col s6");
				// running create card function
				createCard();
				// appending column to recipes div
				$(".recipes-2").append(column);
			}
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

// saving ingredients as array in local storage and displaying
// them on the list page

var shopList = localStorage.getItem("shopping-list");
// checks to see if ingredients list is an array in local storage
// if not, sets local shopList to an empty array
// otherwise, shopList is our current list of ingredients per above
// shop list variable
if (!Array.isArray(shopList)) {
      shopList = [];
}

// function to display shopping list to list page
function displayList() {
	$("#ingredient-data").html(""); // empties table html
	var insideIngredients = JSON.parse(localStorage.getItem("shopping-list"));
	// Checks to see if we have any ingredients in localStorage
  // If we do, set the local insideIngredients variable to our ingredients
  // Otherwise set the local insideIngredients variable to an empty array
  if (!Array.isArray(insideIngredients)) {
    insideIngredients = [];
  }
  // render our insideList ingredients to the table on the page
  for (var i = 0; i < insideIngredients.length; i++) {
  	var tr = $("<tr>"); // create table row
  	var tdIngredient = $("<td>"); // create table data for ingredient
  	tdIngredient.text(insideIngredients[i]); // td text is ingredient
  	var tdRemove = $("<td>"); // create table data for remove button
  	// remove button with class remove item and data index equal to i
  	tdRemove.html("<button class='remove-item'"
  		 + "data-index='" + i + "' id='remove-button'>X</button>"); 
  	// appending the td to the tr  
    tr.append(tdIngredient);
    tr.append(tdRemove);
    // appending tr to the table body
    $("#ingredient-data").append(tr);
  }
};

// render ingredients on page load
displayList();

// function for removing item from list
$(document).on("click", ".remove-item", function(event) {
	// temp variable to store local storage array
	var ingredientList = JSON.parse(localStorage.getItem("shopping-list"));
	// current index equal to the data-index attribute of clicked item
  var currentIndex = $(this).attr("data-index");
  // Deletes the item marked for deletion by splicing at current index
  // and deleting it
  ingredientList.splice(currentIndex, 1);
  // setting shopList equal to ingredient list with deleted item
  shopList = ingredientList;
  // setting local storage euqal to ingredient list of deleted item
  localStorage.setItem("shopping-list", JSON.stringify(ingredientList));
  // running display function
	displayList();
});

// when user clicks add to list...
$(document).on("click", ".add-to-list", function(event) {
	// prevent default
	event.preventDefault();
	// count equal to number of ingredients assigned from ajax call
	var count = $(this).attr("data-count");
  // for each ingredient...
	for (var k = 0; k < count; k++) {
		// save ingredient in val var
		var val = $(this).attr("data-ing-" + k);
		// push the ingredient to the shopList array
		shopList.push(val);
	}
	// setting local storage item to the shop list
  localStorage.setItem("shopping-list", JSON.stringify(shopList));
	// change text letting user know it was successfully added to list
	$(this).text("Successfully added to list!");
	// running display list function
	displayList();
});


////////////////////////////////////////////////////////////////////////////////

// google maps api

// initialize map and infoWindow variables
var map;
var infoWindow;

// this initial map is displayed when page loads - geographic center of USA
function initMap() {
  var initialCenter = {lat: 39.8283, lng: -98.5795};
  var map = new google.maps.Map(document.getElementById('googleMaps'), {
    zoom: 4,
    center: initialCenter
  });
};

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);

// maps ajax call via zip code to retrieve lat/long coordinates
$("#submit-zip").on("click", function() {
	// api key, zip code, query url vars
	var placesApiKey = "AIzaSyDtjFC3Z2h2wmmCyFE0qlMq_mP6jar-ZTc";
	var zipCode = $("#zip-code").val().trim();
	var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="
  	+ zipCode + "&key=" + placesApiKey;
 	
  // ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		// saving lat/long coordinates as var
		var latLong = response.results[0].geometry.location;
		// function to create/write/initialize map at latLong
    function initializeMap() {
   		map = new google.maps.Map(document.getElementById('googleMaps'), {
      	center: latLong,
      	zoom: 12
   		});
   		// initialize info window functionality	
   		infowindow = new google.maps.InfoWindow();
   		var service = new google.maps.places.PlacesService(map);
   		service.nearbySearch({
      	location: latLong,
      	radius: 5000,
      	type: ['grocery_or_supermarket']
   		}, callback);
 		};
    // callback function for service results
    function callback(results, status) {
    	if (status === google.maps.places.PlacesServiceStatus.OK) {
	      for (var i = 0; i < results.length; i++) {
	      	createMarker(results[i]);
	      }
      }
 		};
 		// function to create markers at grocery stores
 		function createMarker(place) {
			var placeLoc = place.geometry.location;
   		var marker = new google.maps.Marker({
      	map: map,
      	position: place.geometry.location
    	});
   		// opens info window when location marker clicked
   		google.maps.event.addListener(marker, 'click', function() {
     		infowindow.setContent(place.name);
     		infowindow.open(map, this);
   		});
 		};
 		// run initializeMap function
 		initializeMap();
	});
});