WeatherWidget.ViewController = (function() {
	var that = {},

	init = function() {
		var weatherModel = WeatherWidget.WeatherModel().init();
		var weatherView = WeatherWidget.WeatherView().init("1", weatherModel);
	};

	that.init = init;

	return that;
})();