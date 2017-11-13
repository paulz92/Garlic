$(document).ready(function(){

// full width for carousel slider
$('.carousel.carousel-slider').carousel({fullWidth: true});

// autoplay the carousel images
function autoplay() {
	$('.carousel').carousel('next');
	setTimeout(autoplay, 4000);
}

autoplay();


$('select').material_select();

$('input[type="checkbox"]').on('change', function() {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});

});

