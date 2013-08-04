Ext.define('Starter.controller.Poll', {
	extend: 'Ext.app.Controller',

	stores: [ 'PageHits' ],
	models: [ 'PageHit' ],
	views: [ 'PollPanel' ],

	refs: [ {
		ref: 'startButton',
		selector: 'pollpanel button[action=start]'
	}, {
		ref: 'stopButton',
		selector: 'pollpanel button[action=stop]'
	} ],

	init: function() {
		this.control({
			'pollpanel': {
				afterrender: this.startPolling,
				destroy: this.stopPolling
			},
			'pollpanel button[action=start]': {
				click: this.startPolling
			},
			'pollpanel button[action=stop]': {
				click: this.stopPolling
			}
		});
	},

	onData: function(provider, event) {
		if (event.data) {
			var store = this.getPageHitsStore(), model = this.getPageHitModel();
			store.removeAll(true);

			Ext.each(Ext.Date.monthNames, function(name, ix) {
				store.add(model.create({
					month: name.substring(0, 3),
					hit: event.data[ix]
				}));
			});
		}
	},

	startPolling: function() {
		var provider = Ext.direct.Manager.getProvider('chartDataPoller');

		this.getStartButton().disable();
		this.getStopButton().enable();
		if (!provider.isConnected()) {
			provider.addListener('data', this.onData, this);
			provider.connect();
		}
	},

	stopPolling: function() {
		var provider = Ext.direct.Manager.getProvider('chartDataPoller');

		this.getStartButton().enable();
		this.getStopButton().disable();
		if (provider.isConnected()) {
			provider.removeListener('data', this.onData);
			provider.disconnect();
		}
	}

});
