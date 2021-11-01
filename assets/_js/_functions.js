function openMenuHamburg(){
	var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

	var hamburgers = document.querySelectorAll(".hamburger");
	if (hamburgers.length > 0) {
	  forEach(hamburgers, function(hamburger) {
		hamburger.addEventListener("click", function() {
		  if($(".content-list").hasClass('is-active')){
				$(".content-list").removeClass("is-active");
				$('.menu').removeClass('fadeIn');
		  }
		  else{
				$(".content-list").addClass("is-active");
				$('.menu').addClass('fadeIn');
		  }
		  
		  this.classList.toggle("is-active");
		}, false);
	  });
	}
}


function getDevice(){
	var device_width = $(window).width(),
		result = "desktop";
	if(device_width >= 1200 && device_width <= 1440){
		result = "notebook";
	}else{
		if(device_width > 992 && device_width < 1200){
			result = "netbook";
		}else{
			if(device_width >= 641 && device_width < 992){
				result = "tablet";
			}else{
				if(device_width >= 320 && device_width < 640){
					result = "mobile";
				}
			}				
		}
	}
	return result;
}
