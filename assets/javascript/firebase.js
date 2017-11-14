
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuse8BMo6IzgxhDoO8RiXxFQvUAzHyRrU",
    authDomain: "garlic-a9fc8.firebaseapp.com",
    databaseURL: "https://garlic-a9fc8.firebaseio.com",
    projectId: "garlic-a9fc8",
    storageBucket: "garlic-a9fc8.appspot.com",
    messagingSenderId: "196444623528"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

  	var firstName = $("#first_name").val().trim();
  	var lastName = $("#last_name").val().trim();
  	var recipe = $("#recipeTried").val().trim();
  	var comment = $("#comment").val().trim();
  	// var rating = $("#rating").val().trim();

  	var review = {
  		firstName: firstName,
  		lastName: lastName,
  		recipe: recipe,
  		comment: comment,
  		// rating: rating
  	};

  	database.ref().push(review);

  	$("#first_name").val("");
  	$("#last_name").val("");
  	$("#recipeTried").val("");
  	$("#comment").val("");
  	// $("#rating").val("");


  });

  database.ref().on("child_added", function(childSnapshot) {

  	var firstName = childSnapshot.val().firstName;
  	var lastName = childSnapshot.val().lastName;
  	var recipe = childSnapshot.val().recipe;
  	var comment = childSnapshot.val().comment;
  	// var rating = childSnapshot.val().rating;

  	// $(".card-title").append("<p>" + firstName + " " + lastName + "</p><br>" +
  	// 						   "<p>" + recipe + " "  + "</p>");
   //  $(".card-content").append("<p>" + comment + "</p>");


 // creating a function to display recipe data in a card
      var createCard = function() {
        // writing to browser
        // creating card div
        var card = $("<div>");
        card.addClass("card");
        // creating div for card title and info
        var cardText = $("<div>");
        cardText.addClass("card-title");
        // creating card title equal to recipe name
        var cardTitle = $("<span>");
        cardTitle.addClass("user-name");
        cardTitle.text(firstName + lastName + "<br>" + recipe);
        // creating page break
        var pageBreak1 = $("<br>");
        var pageBreak2 = $("<br>");
        // appending card title, breaks, and recipe info to card text
        cardText.append(cardTitle);
        cardText.append(pageBreak1);
        // creating card content div
        var cardContent = $("<div>");
        cardContent.addClass("card-content");
        cardContent.text(comment);
        // appending card content to card div
        card.append(cardContent);
       
        // creating a paragraph and appending to card content for
        // each ingredient. also giving data-ing-i attr for each ingredient
        // to the addToList link
        // for (var j = 0; j < data[i].recipe.ingredientLines.length; j++) {
        //   var ingredient = $("<p>");
        //   ingredient.addClass("ingredient");
        //   ingredient.text(data[i].recipe.ingredientLines[j]);
        //   cardContent.append(ingredient);
        //   addToList.attr("data-ing-" + j, data[i].recipe.ingredientLines[j]);
        // }       
       
        // appending card div to column
        column.append(card);
      };

      // for loop for the first 2 recipes to add to first recipe row
      for (var i = 0; i < database; i++) {
        // creating column div with materialize size
        var column = $("<div>");
        column.addClass("col s6");
        // running create card function
        createCard();
        // appending column to recipes div
        $(".reviews").append(column);
      }




  }, function(errorObject) {
  	   console.log("errors handled: " + errorObject.code);

    });

  

  




