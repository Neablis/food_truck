define(['jquery',
        'underscore',
       	'backbone',
	    'text!food_truck/search_bar/templates/search_bar.tp'
	], 

	function( $, _, Backbone, searchBarTp) {

		var SearchBar = Backbone.View.extend({
            /** @lends SearchBar.prototype */

			events: {
				'click .search': 'search',
                'keypress #query': 'search'
            },

            /**
             * This is the model for SearchBar.
             *
             * @augments external:Backbone.Model
             * @constructs
             */
			initialize: function() {
				this.$el.html(_.template(searchBarTp, {}));
			},

			search: function(e) {

                if (e.button !== undefined || e.keyCode === 13) {
                    var query = $('#query').val(),
                        that = this;

                    if (query.length !== 0) {
                        App.geocoder.geocode( { 'address': query}, function(results, status) {

                            if (status == google.maps.GeocoderStatus.OK) {
                                var latitude = results[0].geometry.location.lat();
                                var longitude = results[0].geometry.location.lng();
                                that.$el.trigger('search', {
                                    query: query,
                                    location: {lat: latitude, lng: longitude},
                                    service: 'food'
                                });
                            } else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {

                            }
                        });

                    }
                }
			}
		});

		return SearchBar;
	});
