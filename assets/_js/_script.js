$(document).ready(function(){
	openMenuHamburg();

	$("#closeMenu").on('click', function(){
		if($(".content-list").hasClass('is-active')){
			$(".content-list").removeClass("is-active");
			$('.menu').removeClass('fadeIn');
			$(".hamburger").removeClass("is-active");
	  	}
	});

	$(window).scroll(function(){
		var top = ($(window).scrollTop());
		if(top >= 70){
			$('.header').addClass('header-scroll');
			$('.header').addClass('fadeInDown');
		}
		else
		{
			$('.header').removeClass('header-scroll');
			$('.header').removeClass('fadeInDown');
		}
	});

	var $carouselProducts = $('.carousel-products').owlCarousel({
		loop:true,
		margin:29,
		dots:true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items:4,
		nav: true,
		autoplayTimeout:6000,
		navText: ["<img src='./images/angle-left.svg'>","<img src='./images/angle-right.svg'>"],
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:4,
                nav:true
            }
        }
	});

	$(".scroll").click(function(event){        
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top - 70}, 500);

	});


    // Exibe ou oculta o botão
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > 350) {
			jQuery('.icon-chat').fadeIn(300);
		} else {
			jQuery('.icon-chat').fadeOut(300);
		}
	});
    
    

});
