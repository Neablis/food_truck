define(['jquery',
        'underscore',
       	'backbone'
	], 

	function( $, _, Backbone) {

		var Food = Backbone.Model.extend({

			search: function(params, success, error) {
			

				this.fetch({
					url: this.build_query(),
					type: 'get',
					dataType: 'json',
					success: function(model, response, options) {
						var results = response || [],
						    instances = [];
						for(var i=0;i<results.length;i++) {
							var r = results[i];
                            r.title = r.applicant;
                            r.lat = r.latitude;
                            r.lng = r.longitude;
							instances.push( new Food(r));
						}
						success(instances);
					},
					error: function() {
						error(arguments);
					}
				});
			},
			build_query: function (params) {
                params = params || {};

				var urlRoot = 'http://data.sfgov.org/resource/rqzj-sfat.json',
					select = params.select || "status,longitude,latitude,facilitytype,address,fooditems,applicant",
					token = params.token || "kXCgznVAfVKGVNGNcolrOPJcm",
					limit = params.limit || 100,
					offset = params.offset || 0,
					url = "";

				//Rewrite this to be more dynamic
				url = urlRoot + "?" + "$select=" + select;
                url	+= "&" + "$$app_token=" + token;
                url	+= "&" + "$limit=" + limit;
                url	+= "&" + "$offset=" + offset;

				return url;
			}
		});

		return Food;
	});
