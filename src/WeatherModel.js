WeatherWidget.WeatherModel = function () {
	var that = {},
		params = null,

		weatherCodes = {
			"thunderstorm": [200, 232],
			"drizzle": [300, 321],
			"rain": [500, 522],
			"snow": [600, 621],
			"clear": [800, 800],
			"clouds": [801, 803]
		},

		init = function (newParams) {
			params = newParams;
			return that;
		},

		fetchWeatherForCity = function (city, callback) {
			var url =
				"http://api.openweathermap.org/data/2.5/find?q=" + city + "&units=metric&mode=json";

			$.ajax({
				url: url,
				type: "GET",
				contentType: "text/javascript",
				dataType: "jsonp",
				success: callback
			});
		},

		getIconByWeatherCode = function (weatherCode, callback) {
			for (var key in weatherCodes) {
				if (weatherCode >= weatherCodes[key][0] || weatherCode <= weatherCodes[key][1]) {
					callback(key);
				}
			}
		};

	that.init = init;
	that.fetchWeatherForCity = fetchWeatherForCity;
	that.getIconByWeatherCode = getIconByWeatherCode;

	return that;
};