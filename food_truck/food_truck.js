/**
 * @exports food_truck/App
 * @module view/App
 * @namespace
 */
define(['jquery',
        'underscore',
       	'backbone',
        'toastr',

	'food_truck/models/search_list',
	'food_truck/models/food',

	'food_truck/search_bar/search_bar',
	'food_truck/history/history',
	'food_truck/tabs/tabs',
	'food_truck/search_results/search_results',

	'text!food_truck/templates/layout.tp',
	'text!food_truck/search_results/templates/food.tp',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAZyZHcILxZ6UUYqHDDIgcI4bPB3rOOCMQ&sensor=false'
	],

	function( $, _, Backbone, toastr,

		  SearchList,
		  Food,

		  SearchBar,
		  History,
		  Tabs,
		  SearchResults,

		  layoutTp,
		  foodTp
	) {
        /**
         * This is a root view for App
         * @constructor
         * @requires Jquery
         * @requires lodash
         * @requires Backbone
         * @requires toastr
         * @class App
         * @module view/App
         * @name App
         * @constructor
         * @return App Object
         */

        var App = Backbone.View.extend({
            /** @lends App.prototype */

            events: {
                'search .search_bar': 'newSearch',
                'search .history': 'historySearch'
            },
            /**
             * This is the model for App.
             * @name App
             * @augments external:Backbone.Model
             * @constructs
             */
            initialize: function() {
                window.App = this;
                this.$el.html(_.template(layoutTp, {}));

                this.searchBar = new SearchBar({
                    el: this.$el.find('.search_bar')
                });

                this.tabs = new Tabs({
                    el: this.$el.find('.tabs_wrapper')
                });

                this.history = new History({
                    el: this.$el.find('.history'),
                    searches: new SearchList()
                });

                this.foodSearchResults = new SearchResults({
                    el: $('#food_panel'),
                    model: new Food(),
                    template: foodTp
                });

                this.mapSearchResults = new SearchResults({
                    el: $('#maps_panel'),
                    model: new Food(),
                    template: foodTp
                });

                this.geocoder = new google.maps.Geocoder();

                this.toastr = toastr;

                this.toastr.options = {
                    toastClass: 'alert',
                    iconClasses: {
                        error: 'alert-error',
                        info: 'alert-info',
                        success: 'alert-success',
                        warning: 'alert-warning'
                    }
                };
            },
            /**
             * @param {Object} ev - Event
             * @param {Object} search - a Search object
             * @returns {Null}
             * @description Adds a search to history then runs the search
             */
            newSearch: function(ev, search) {

                this.history.addSearch(search);

                this.performSearch(search);
            },
            /**
             * @param {Object} ev - Event
             * @param {Object} search - a Search object
             * @returns {Null}
             * @description Runs a existing search from history
             */
            historySearch: function(ev, search) {
                this.performSearch(search);
            },

            /**
             * @param {Object} search - Search object
             * @returns {Null}
             * @description Creates a search view from a search
             */
            performSearch: function(search) {

                var service = search && search.service,
                    tabId = '#'+service+'_panel',
                    viewId = service + 'SearchResults',
                    view = this[viewId];

                if(view) {

                    this.tabs.select(tabId);
                    view.search(search);
                }
            }
        });
        return App;
	});
