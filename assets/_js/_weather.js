/*
////////////////////////////////
	Weather PLugin
///////////////////////////////
*/	


/*
////////////////////////////
	Interactions
///////////////////////////
*/
	//Open Settings
	$('.weather-action-settings').on('click', function(){
		$('.weather .weather-lightbox').addClass('open');
	});

	//Close Settings
	$('.weather-action-close').on('click', function(){
		$('.weather .weather-lightbox').removeClass('open');
		$('#settings').css({
			'display' : 'block'
		});
		$('#settings-graus').css({
			'display' : 'none'
		});
		$('#settings-city').css({
			'display' : 'none'
		});
		$('.weather-action-back').css({
			'display' : 'none'
		});
	});

	//Open Setting Temperatura
	$('#settings .weather-options-list li:first-child').on('click', function(){
		$('#settings').css({
			'display' : 'none'
		});
		$('#settings-graus').css({
			'display' : 'block'
		});
		$('.weather-action-back').css({
			'display' : 'block'
		});
	});

	//Open Setting Cidade
	$('#settings .weather-options-list li:last-child').on('click', function(){
		$('#settings').css({
			'display' : 'none'
		});
		$('#settings-city').css({
			'display' : 'block'
		});
		$('.weather-action-back').css({
			'display' : 'block'
		});
	});

	//Back to Setting
	$('.weather-action-back').on('click', function(){
		$('#settings').css({
			'display' : 'block'
		});
		$('#settings-graus').css({
			'display' : 'none'
		});
		$('#settings-city').css({
			'display' : 'none'
		});
		$('.weather-action-back').css({
			'display' : 'none'
		});
	});

	//Get Weather from gps button
	$('.weather-action-gps').on('click', function(){
		var gps_weather = new Weather();
		gps_weather.get_weather();
	});

/*
////////////////////////////
	//Interactions
///////////////////////////
*/

/*
///////////////////////////////
	Get Weather
//////////////////////////////
*/
	var latitude;
	var longitude;
	var Weather = function(){
		var lat;
		var lng;
		var city;
		this.get_weather = function(city, uf){
				if(city != null){
					if(uf != null){
						/*
							City and State
						===============================
						*/
							var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
							var g_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+","+uf+"&key="+g_key;
							$.ajax({
								url: g_url,
								success: function(google_res) {
									city = google_res.results[0].address_components[0].short_name;
									uf = google_res.results[0].address_components[2].long_name;
									var country = google_res.results[0].address_components[3].long_name;
									$(".weather-location-city").html(city);
									$(".weather-location-uf").html(uf+", "+country);

									y_base = "http://query.yahooapis.com/v1/public/yql";
									y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+","+uf+"')";
									y_url = y_base+"?q="+y_yql+"&format=json";
									
									$.ajax({
										url: y_url,
										success: function(response) {
											$(".weather-temp-graus").html(response.query.results.channel.wind.chill+"°");
											$(".weather-temp-clima").html(response.query.results.channel.item.condition.text);
										},
										error: function(response){
										}
									});
								}, 
								error: function(){
									alert("error");
								}
							});
					}else{

						/*
							City
						===============================
						*/
							var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
							var g_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key="+g_key;
							$.ajax({
								url: g_url,
								success: function(google_res) {
									city = google_res.results[0].address_components[0].short_name;
									uf = google_res.results[0].address_components[2].long_name;
									var country = google_res.results[0].address_components[3].long_name;
									$(".weather-location-city").html(city);
									$(".weather-location-uf").html(uf+", "+country);

									y_base = "http://query.yahooapis.com/v1/public/yql";
									y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+"')";
									y_url = y_base+"?q="+y_yql+"&format=json";
									
									$.ajax({
										url: y_url,
										success: function(response) {
											$(".weather-temp-graus").html(response.query.results.channel.wind.chill+"°");
											$(".weather-temp-clima").html(response.query.results.channel.item.condition.text);
										},
										error: function(response){
										}
									});
								}, 
								error: function(){
									alert("error");
								}
							});
					}
				}else{

					
						navigator.geolocation.getCurrentPosition(function(position){
							var vlatitude = position.coords.latitude;
							var vlongitude =  position.coords.longitude;
							
							var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
							var g_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+vlatitude+","+vlongitude+"&key="+g_key;
							$.ajax({
								url: g_url,
								success: function(google_res) {
									city = google_res.results[0].address_components[3].short_name;
									uf = google_res.results[0].address_components[5].long_name;
									var country = google_res.results[0].address_components[6].long_name;
									$(".weather-location-city").html(city);
									$(".weather-location-uf").html(uf+", "+country);

									y_base = "http://query.yahooapis.com/v1/public/yql";
									y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+","+uf+"')";
									y_url = y_base+"?q="+y_yql+"&format=json";
									
									$.ajax({
										url: y_url,
										success: function(response) {
											$(".weather-temp-graus").html(response.query.results.channel.wind.chill+"°");
											$(".weather-temp-clima").html(response.query.results.channel.item.condition.text);
										},
										error: function(response){
										}
									});

								}, 
								error: function(){
									alert("error");
								}
							});
						});
				}
		}
		
	}

/*
/////////////////////////////////////////////
	Nova tentativa
/////////////////////////////////////////////
*/
	
	$.fn.rw_weather = function(option){

		var settings = $.extend( {
	      'city'	: null,
	      'state'	: null,
	      'lang'	: 'pt-br',
	      'celsius' : true
    	}, option);
		/*
		////////////////////////////////////
			Variables
		///////////////////////////////////
		*/

		/*
		////////////////////////////////////
			//Variables
		///////////////////////////////////
		*/
			var lat;
			var lng;
			var selector = $(this).attr('id');
			var htmlval;

			//Lan
			var en = ['tornado','tropical storm','hurricane','severe thunderstorms','thunderstorms','mixed rain and snow','mixed rain and sleet','mixed rain and sleet','freezing drizzle','drizzle','freezing rain','showers','showers','snow flurries','light snow showers','blowing snow','snow','hail','sleet','dust','foggy','haze','smoky','blustery','windy','cold','cloudy','mostly cloudy','mostly cloudy','partly cloudy','partly cloudy ','clear','sunny','fair','fair','mixed rain and hail','hot','isolated thunderstorms','scattered thunderstorms','scattered thunderstorms','scattered showers','heavy snow','scattered snow showers','heavy snow','partly cloudy','thundershowers','snow showers','isolated thundershower','not available'];
			var ptbr = ['tornado','tempestade tropical','furacão','fortes tempestades','tempestade','chuva com neve','chuva com granizo','chuva com granizo','garoa fria','garoa','chuva fria','dia chuvoso','dia chuvoso','flocos de neve','chuvoso com flocos de neve','soprando neve','neve','granizo','granizo','seco','neblina','neblina','neblina','ventania','ventania','frio','nublado','noite nublada','dia nublado','parcialmente nublado','parcialmente nublado','céu limpo','ensolarado','noite com poucas nuvens','dia com poucas nuvens','chuva com granizo','Ensolarado','trovoadas','trovoadas','trovoadas','chuvas rápidas','neve pesada','chuva de neve rápidas','neve pesada','parcialmente nublado','chuva de raios','chuva de neve','trovoadas','clima não disponível'];

		/*
		////////////////////////////////////
			Functions
		///////////////////////////////////
		*/
			//Get Weather
			function getWeather(city, state){
				if(city != null){
					if (state != null) {
						var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
						var g_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+","+state+"&key="+g_key;
						//$('#link-g').html(g_url);
						//$('#link-g').attr('href', g_url);

						$.ajax({
							url: g_url,
							success: function(google_res) {
								city = google_res.results[0].address_components[0].short_name;
								state = google_res.results[0].address_components[2].long_name;
								var country = google_res.results[0].address_components[3].long_name;
								htmlval = "<div class='weather'><span class='w-locality w-locality-city'>"+city+"</span><span class='w-locality'>"+state+", "+country+"</span>";

								var y_base = "http://query.yahooapis.com/v1/public/yql";
								var y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+","+state+"')";
								var y_url = y_base+"?q="+y_yql+"&format=json";
										
							
								//$('#link-y').html(y_url);
								//$('#link-y').attr('href', y_url);	

								$.ajax({
									url: y_url,
									success: function(response) {
										var cli_cod = response.query.results.channel.item.condition.code;
										var icon = en[cli_cod];
										icon = icon.replace(" ", "-");
										if(settings.celsius){
											var temp = parseInt((response.query.results.channel.wind.chill -32)/ 1.8000); 
										}else{
											var temp = response.query.results.channel.wind.chill;						
										}
										if(settings.lang == 'pt-br'){
											htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+ptbr[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
										}else{
											htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+en[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
										}
										
										$("#"+selector).html(htmlval);
									},
									error: function(response){
									}
								});
							}, 
							error: function(){
							}
						});
					}else{
						var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
						var g_url = "https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key="+g_key;
						//$('#link-g').html(g_url);
						//$('#link-g').attr('href', g_url);
						
						$.ajax({
							url: g_url,
							success: function(google_res) {
								city = google_res.results[0].address_components[0].short_name;
								uf = google_res.results[0].address_components[2].long_name;
								var country = google_res.results[0].address_components[3].long_name;
								htmlval = "<div class='weather'><span class='w-locality w-locality-city'>"+city+"</span><span class='w-locality'>"+uf+", "+country+"</span>";

								var y_base = "http://query.yahooapis.com/v1/public/yql";
								var y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+","+uf+"')";
								var y_url = y_base+"?q="+y_yql+"&format=json";

								
								//$('#link-y').html(y_url);
								//$('#link-y').attr('href', y_url);
											
								$.ajax({
									url: y_url,
									success: function(response) {
										var cli_cod = response.query.results.channel.item.condition.code;
										var icon = en[cli_cod];
										icon = icon.replace(" ", "-");
										if(settings.celsius){
											var temp = parseInt((response.query.results.channel.wind.chill -32)/ 1.8000); 
										}else{
											var temp = response.query.results.channel.wind.chill;						
										}
										if(settings.lang == 'pt-br'){
											htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+ptbr[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
										}else{
											htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+en[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
										}
										
										$("#"+selector).html(htmlval);
									},
									error: function(response){
									}
								});
							}, 
							error: function(){
							}
						});
					}
				}
				
			}
			//Get Weather from Geolocation
			function getWeatherFromGPS(){

				navigator.geolocation.getCurrentPosition(function(position){
					lat = position.coords.latitude;
					lng = position.coords.longitude;

					var g_key = "AIzaSyAaNErrjMLkHqvIkmvbvJHmLrK9DIYzgvI";
					var g_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key="+g_key;
					//$('#link-g').html(g_url);
					//$('#link-g').attr('href', g_url);
					
					$.ajax({
						url: g_url,
						success: function(google_res) {
						city = google_res.results[0].address_components[3].short_name;
						uf = google_res.results[0].address_components[4].long_name;
						var country = google_res.results[0].address_components[5].long_name;
						htmlval = "<div class='weather'><span class='w-locality w-locality-city'>"+city+"</span><span class='w-locality'>"+uf+", "+country+"</span>";

						var y_base = "http://query.yahooapis.com/v1/public/yql";
						var y_yql = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+city+","+uf+"')";
						var y_url = y_base+"?q="+y_yql+"&format=json";
									
						//$('#link-y').html(y_url);
						//$('#link-y').attr('href', y_url);
						
						$.ajax({
							url: y_url,
							success: function(response) {
								var cli_cod = response.query.results.channel.item.condition.code;
								var icon = en[cli_cod];
								icon = icon.replace(" ", "-");
								if(settings.celsius){
									var temp = parseInt((response.query.results.channel.wind.chill -32)/ 1.8000); 
								}else{
									var temp = response.query.results.channel.wind.chill;						
								}
								if(settings.lang == 'pt-br'){
									htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+ptbr[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
								}else{
									htmlval = htmlval +"<span class='w-forecast w-forecast-cli'><span class='w-icon w-icon-"+icon+"'></span>"+en[cli_cod]+"</span><span class='w-forecast w-forecast-tmp'>"+temp+"°</span></div>";
								}
								
								$("#"+selector).html(htmlval);
							},
							error: function(response){
							}
						});

						}, 
						error: function(){
						}
					});

				});
			}
		/*
		////////////////////////////////////
			//Functions
		///////////////////////////////////
		*/


		/*
		////////////////////////////////////
			Conditions
		///////////////////////////////////
		*/
			if(settings.city != null){
				if (settings.state != null){
					getWeather(settings.city, settings.state);
				}else{
					getWeather(settings.city);
				}
			}else{
				getWeatherFromGPS();
			}
		/*
		////////////////////////////////////
			//Conditions
		///////////////////////////////////
		*/

		/*
		////////////////////////////////////
			Return
		///////////////////////////////////
		*/
			return this.each(function(){
				       
	       	});

		/*
		////////////////////////////////////
			//Return
		///////////////////////////////////
		*/
	};