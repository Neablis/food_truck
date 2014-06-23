define(['jquery', 'underscore', 'backbone', 'backbone_localstorage'],

       function($, _, Backbone) {

		var SearchList = Backbone.Collection.extend({
            /** @lends models/SearchList.prototype */
			localStorage: new Backbone.LocalStorage('searches')
		});

		return SearchList;
	});
