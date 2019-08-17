$(document).ready(function(){


// home page slider

var $slideContainterHome = $('.home_slider'),
$sliderH = $slideContainterHome.slick({
	dots: true,
	infinite: false,
	speed: 1000,
	draggable: true,
	arrows: false,
		// autoplay:true
	});
$sliderH.on('beforeChange', function(event, slick, currentSlide, nextSlide){
	setTimeout(function(){
		var activeNow = $('.slick-dots li.slick-active').text();
			// $('.slick-dots li').fadeOut();
			$('.slick-dots').removeClass('green');
			$('.slick-dots').removeClass('pink');
			$('.slick-dots').removeClass('orange');
			$('.slick-dots').removeClass('white');
			var className = ['green', 'pink', 'orange', 'white'];
			$('.slick-dots li').parent('.slick-dots').addClass(className[activeNow - 1]);
			// $('.slick-dots li').fadeIn();
		},10);
});

colorSettings = {
	section: ['#cdd6d5', '#cdcdcd','#e7e7e7', '#f7f7f7'],
	btn1: ['#2b3335', '#34233b','#19aaad', '#4e4e4e'],
	btn2: ['#659827', '#f73953','#ef6439', '#f4ad48']
},
changeColors = function (slide) {
	console.log("color=========>",colorSettings.section[slide]);
	$('.slider_background').css({
		background: colorSettings.section[slide]
	},10);
	$('.btn_join').css({
		background: colorSettings.btn1[slide]
	},10);
	$('.btn_enter').css({
		background: colorSettings.btn2[slide]
	},10);
};
changeColors(0);

$sliderH.on('beforeChange', function(event, slick, currentSlide, nextSlide){
	changeColors(nextSlide);
});
// home page slider end


// gender slider start

$('.gender_slider').slick({
	// autoplay: true,
	autoplaySpeed:2000,
	arrows: false,
	dots: false,
	slidesToShow:1.5,
	slidesToScroll: 1,
	draggable: true,
	fade:false,
	responsive: [
	{
		breakpoint: 767,
		settings: {
			slidesToShow: 1
		}
	}
	]
});

// gender slider end

/*bank detail slider start*/
$('.slider1').slick({
	infinite: true,
	slidesToShow: 1.5,
	slidesToScroll: 1,
	autoplay: false,
	arrows: false,
	prevArrow:'<button class="prevarrow text-center"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
	nextArrow:'<button class="nextarrow text-center"><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
	responsive: [
	{
		breakpoint: 600,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	},
	{
		breakpoint: 480,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		}
	}
	]
});
/*bank detail slider end*/


// scrollbar starts
$('.scrollbar-rail').scrollbar();
// scrollbar ends


});



