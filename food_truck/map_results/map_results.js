define(['jquery',
        'underscore',
        'backbone'
    ],

    function( $, _, Backbone) {

        var MapResults = Backbone.View.extend({
            /** @lends MapResults.prototype */

            /**
             * This is the model for map_results.
             *
             * @augments external:Backbone.Model
             * @constructs
             */
            initialize: function (options) {
                this.template = options.template;
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
            },
            rad: function(x) {
                return x * Math.PI / 180;
            },

            getDistance: function(p1, p2) {
                var R = 6378137; // Earth’s mean radius in meter
                var dLat = rad(p2.lat() - p1.lat());
                var dLong = rad(p2.lng() - p1.lng());
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d; // returns the distance in meter
            },
            errorLoadingResults: function(model, xhr, options) {

                    console.log('Error loading searches.');
                }
            });

        return SearchResults;
    });
