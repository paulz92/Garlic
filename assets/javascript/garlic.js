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

		var data = response.hits;

		// for loop logging the different recipe names
		for (var i = 0; i < data.length; i++) {
			// writing to browser
			// creating column div with materialize size
			var column = $("<div>");
			column.addClass("col s3");
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
			var pageBreak = $("<br>");
			// creating recipe info title
			var recipeInfo = $("<span>");
			recipeInfo.addClass("recipe-info");
			recipeInfo.text("Serves: " + data[i].recipe.yield + " Calories: " + 
				Math.round(data[i].recipe.calories/data[i].recipe.yield))
			// appending card title and recipe info to card text
			cardText.append(cardTitle);
			cardText.append(pageBreak);
			cardText.append(recipeInfo);
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
			// appending column to recipes div
			$(".recipes").append(column);

			// console logs
			// logs recipe name
			console.log("Recipe Name: " 
				+ data[i].recipe.label);
			// nested for loop for looping through the ingredients in each recipe
			for (var j = 0; j < data[i].recipe.ingredientLines.length; j++) {
				console.log("Ingredients: " 
					+ data[i].recipe.ingredientLines[j]);
			}
			// logs number of servings
			console.log("Serves: "
				+ data[i].recipe.yield);
			// logs image url
			console.log("Image: " 
				+ data[i].recipe.image);
			// logs link to recipe
			console.log("Link: "
				+ data[i].recipe.shareAs);
			// logs health labels
			console.log("Health Labels: " 
				+ data[i].recipe.healthLabels);
			// logs diet labels
			console.log("Diet Labels: " 
				+ data[i].recipe.dietLabels);
			console.log("Calories per serving: "
				+ Math.round(data[i].recipe.calories/data[i].recipe.yield));
			console.log("========================================================");
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

// google maps api testing

var placesApiKey = "AIzaSyDtjFC3Z2h2wmmCyFE0qlMq_mP6jar-ZTc";
