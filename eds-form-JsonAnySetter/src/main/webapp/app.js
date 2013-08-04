Ext.Loader.setConfig({
	enabled: true
});

Ext.require('Ext.direct.*', function() {
	var chartDataPoller = Ext.create('Ext.direct.PollingProvider', {
		id: 'chartDataPoller',
		type: 'polling',
		interval: 5 * 1000, // 5 seconds
		url: Ext.app.POLLING_URLS.chart
	});

	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, chartDataPoller);
	Ext.direct.Manager.getProvider('chartDataPoller').disconnect();
});

Ext.application({
	controllers: [ 'Poll', 'User', 'Form' ],
	autoCreateViewport: true,
	name: 'Starter',
	launch: function() {
		Ext.fly('appLoadingIndicator').destroy();
	}
});
