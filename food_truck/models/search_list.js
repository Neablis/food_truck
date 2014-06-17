define(['jquery', 'underscore', 'backbone', 
        'backbone_localstorage'],

       function($, _, Backbone) {

		var SearchList = Backbone.Collection.extend({

			localStorage: new Backbone.LocalStorage('searches')

		});

		return SearchList;
	});
