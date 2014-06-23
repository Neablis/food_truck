define(['jquery',
        'underscore',
       	'backbone'
	], 

	function( $, _, Backbone) {

		var SearchResults = Backbone.View.extend({
            /** @lends SearchResults.prototype */

            /**
             * This is the View for SearchResults.
             * @name SearchResults
             * @augments external:Backbone.View
             * @name SearchResults
             * @constructs
             */
            initialize: function (options) {
                this.template = options.template;
                this.panel = $('#food_panel');
                this.panel.css('height', ($(window).height() - this.panel.position().top) - 150);
            },
            /**
             * @param {Object} search
             * @returns {Null}
             * @description Runs a search from a search object
             */

            search: function(search) {

				this.model.search(
					search, 
					$.proxy(this.resultsLoaded, this),	
					$.proxy(this.errorLoadingResults, this)
				);
			},
            /**
             * @param {JSON} results - a Json struct of all results
             * @returns {Null}
             * @description Fills the view with the results and sets the height
             */
			resultsLoaded: function(results) {
			
				this.$el.html( _.template(this.template, {
					results: results 
				}));

                this.$el.find('table tbody').height(this.panel.height()-35);
			},
            /**
             * @param {Object} model
             * @param {Object} xhr
             * @param {Object} optiosn
             * @returns {Null}
             * @description Logs a error when the xhr fails
             */
			errorLoadingResults: function(model, xhr, options) {
			
				console.log('Error loading searches.');	
			}
		});

		return SearchResults;
	});
