// when submit button is clicked on search page
$("#submit").on("click", function() {
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
			var cardTitle = $("<span>");
			cardTitle.addClass("recipe-name");
			cardTitle.text(data[i].recipe.label);
			// creating page break
			var pageBreak1 = $("<br>");
			var pageBreak2 = $("<br>");
			// creating serving info title
			var servingInfo = $("<span>");
			servingInfo.addClass("recipe-info");
			servingInfo.text("Serves: " + data[i].recipe.yield);
			// creating calorie info title
			var calorieInfo = $("<span>");
			calorieInfo.addClass("recipe-info");
			calorieInfo.text("Calories: " + 
				Math.round(data[i].recipe.calories/data[i].recipe.yield));
			// appending card title and recipe info to card text
			cardText.append(cardTitle);
			cardText.append(pageBreak1);
			cardText.append(servingInfo);
			cardText.append(pageBreak2);
			cardText.append(calorieInfo);
			// appending recipe pic and title to card image div
			cardImage.append(recipePic);
			cardImage.append(cardText);
			// appending card Image div to card div
			card.append(cardImage);
			// creating card content div
			var cardContent = $("<div>");
			cardContent.addClass("card-content");
			// creating a paragraph and appending to card content for
			// each ingredient
			for (var j = 0; j < data[i].recipe.ingredientLines.length; j++) {
				var ingredient = $("<p>");
				ingredient.addClass("ingredient");
				ingredient.text(data[i].recipe.ingredientLines[j]);
				cardContent.append(ingredient);
			}
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
			// add to list link
			var addToList = $("<a>");
			addToList.attr("href", "#");
			addToList.text("Add to shopping list");
			cardAction.append(addToList);
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
	});
});

////////////////////////////////////////////////////////////////////////////////

// google maps api testing

var placesApiKey = "AIzaSyDtjFC3Z2h2wmmCyFE0qlMq_mP6jar-ZTc";
