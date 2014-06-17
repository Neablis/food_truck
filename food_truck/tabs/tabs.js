define(['jquery',
        'underscore',
       	'backbone'
	], 

	function( $, _, Backbone) {

		var Tabs = Backbone.View.extend({

			events: {
				'click .tab a': 'tabClick'
			},

			initialize: function() {
			
				this.$el.find('.panel').hide();
				this.select('#food_panel');
			},

			tabClick: function(ev) {
			
				var target = $(ev.target),
			        anchorEl = target.closest('a'),
				    tabId = anchorEl.attr('href');

				this.select(tabId);
			
				ev.preventDefault();
			},

			select: function(tabId) {
			
				var curTabEl = this.$el.find('.active'),
				    curTabId = curTabEl.find('a').attr('href'),
				    curPanelEl = $(curTabId),
				    newTabEl = this.getTabEl(tabId),
				    newPanelEl = $(tabId);

				curTabEl.removeClass('active');
				curPanelEl.hide();	

				if(newTabEl) {

					newTabEl.addClass('active');
					newPanelEl.show();
				}
			},

			getTabEl: function(id) {
			
				var tabEls = this.$el.find('.tab');

				for(var i=0; i<tabEls.length; i++) {

					var tabEl = $(tabEls[i]),
					    tabId = tabEl.find('a').attr('href');

					if(tabId === id) return tabEl;	       
				}
			}
		});

		return Tabs;
	});
