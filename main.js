requirejs.config({
	baseUrl: '/',
	paths: {
		text: 'bower_components/requirejs-plugins/lib/text',
		jquery: 'bower_components/jquery/jquery.min',
		underscore: 'bower_components/lodash/dist/lodash.underscore.min',
		backbone: 'bower_components/backbone/backbone',
        marionette: 'bower_components/backbone.marionette.js/index',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        backbone_localstorage: 'bower_components/backbone.localStorage.js/backbone.localStorage-min',
        backbone_googlemaps: 'bower_components/backbone.googlemaps/lib/backbone.googlemaps-min',
        toastr: 'bower_components/toastr/toastr.min',
        async: 'bower_components/requirejs-plugins/src/async'
    },
    "shim": {
        "backbone": {
            "deps": [
                "jquery",
                "underscore"
            ],
            "exports": "Backbone"
        },
        'marionette': {
            'deps': ['jquery', 'underscore', 'backbone'],
            'exports': 'Marionette'
        },
        "bootstrap": {
            "deps": ["jquery"]
        }
    }
});

requirejs(['jquery', 
	   'underscore',
	   'backbone',
	   'food_truck/food_truck'], function($, _, Backbone, App) {

		new App({
			el: $('#food_truck_application')
		});
});
