$(document).ready(function(){

	// full width for carousel slider
	$('.carousel.carousel-slider').carousel({fullWidth: true});

	// autoplay the carousel images
	function autoplay() {
		$('.carousel').carousel('next');
		setTimeout(autoplay, 4000);
	}

	autoplay();

	// needed for collapsible links on med and smaller screens
	$(".button-collapse").sideNav();

	$('select').material_select();

	$('input[type="checkbox"]').on('change', function() {
	    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
	});


	$(function() {
    $('span.stars').stars();
	});
});

$.fn.stars = function() {
  return $(this).each(function() {
    // Get the value
    var val = parseFloat($(this).html());
    // Make sure that the value is in 0 - 5 range, multiply to get width
    var size = Math.max(0, (Math.min(5, val))) * 16;
    // Create stars holder
    var $span = $('<span />').width(size);
    // Replace the numerical value with stars
    $(this).html($span);
  });
}