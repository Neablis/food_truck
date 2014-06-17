define(['jquery',
        'underscore',
       	'backbone'
	], 

	function( $, _, Backbone) {

		var SearchResults = Backbone.View.extend({

            initialize: function (options) {
                this.template = options.template;
                this.panel = $('#food_panel');
                this.panel.css('height', ($(window).height() - this.panel.position().top) - 150);
            },
			search: function(search) {

				this.model.search(
					search, 
					$.proxy(this.resultsLoaded, this),	
					$.proxy(this.errorLoadingResults, this)
				);
			},

			resultsLoaded: function(results) {
			
				this.$el.html( _.template(this.template, {
					results: results 
				}));

                this.$el.find('table tbody').height(this.panel.height()-35);
			},

			errorLoadingResults: function(model, xhr, options) {
			
				console.log('Error loading searches.');	
			}
		});

		return SearchResults;
	});
