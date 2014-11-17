WeatherWidget.WeatherView = function () {
	var that = {},
		el = null,
		model = null,
		counter = 0,

		weather = {
			city: "Regensburg",
			description: "",
			icon: ""
		},

		init = function (id, newModel) {
			model = newModel;

			el = document.getElementById("weather-widget-" + id);
			el.querySelector(".widget").addEventListener("click", _onWidgetClick);

			input = el.querySelector(".widget-input");
			input.addEventListener("keyup", _onInputKeyUp);

			model.fetchWeatherForCity(weather.city, _onFetchWeatherForCity);
			render();

			return that;
		},

		render = function () {
			el.querySelector(".widget-name").innerText = weather.city;
			el.querySelector(".widget-description").innerText = weather.description;
			el.querySelector(".widget-icon").className = "widget-icon " + weather.icon;
		},

		_onFetchWeatherForCity = function (data) {
			var temp = (Math.round(data.list[0].main.temp * 10)) / 10;
			weather.description = temp + " °C " + data.list[0].weather[0].description;
			weather.icon = data.list[0].weather[0].id;
			model.getIconByWeatherCode(weather.icon, _setIcon);
			render();
		},

		_setIcon = function (icon) {
			weather.icon = "weather-icon-" + icon;
		},

		_onWidgetClick = function (event) {
			console.log(event);
			if (counter % 2 == 0) {
				$("div.widget").toggleClass("flipped");
				counter++;
			}
		},

		_onInputKeyUp = function (event) {
			if (event.keyCode == 13 && counter % 2 != 0) {
				weather.city = document.getElementsByClassName("widget-input")[0].value;
				
				var weatherModel = WeatherWidget.WeatherModel().init();
				init("1", weatherModel)
				$("div.widget").toggleClass("flipped");
				counter++;
			}
		};

	that.init = init;
	that.render = render;

	return that;
};