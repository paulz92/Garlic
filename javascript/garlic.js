// edamam api testing
var appId = "7b2538fb";
var appKey = "3d5f22a7f31011443f8d5e9a16d0c284";
var foodSearch = "flounder broccoli";
var healthSearch = "egg-free";
var dietSearch = "low-fat";
var numberResults = 3;
var queryURL = "https://api.edamam.com/search?q=" + foodSearch + "&health=" 
	+ healthSearch + "&diet=" + dietSearch +"&from=0&to=" + numberResults;

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

////////////////////////////////////////////////////////////////////////////////

// google maps api testing

var placesApiKey = "AIzaSyDtjFC3Z2h2wmmCyFE0qlMq_mP6jar-ZTc";