$(document).ready(function(){

$('.carousel.carousel-slider').carousel({fullWidth: true});


$('select').material_select();


$('input[type="checkbox"]').on('change', function() {
    $('input[name="' + this.name + '"]').not(this).prop('checked', false);
});

});