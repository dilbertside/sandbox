Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});
Ext.Loader.setPath('Ext.ux', 'ext422/examples/ux');
//Ext.Loader.setPath('Ext.ux', 'http://cdn.sencha.com/ext/gpl/4.2.1/examples/ux');
Ext.Loader.setPath('Ext.ux.ws.wamp', 'res/js/ws/wamp');
Ext.Loader.setPath('WA', 'app');

Ext.application({
	requires:['Ext.ux.ws.wamp.Manager', 'Ext.ux.ws.wamp.Proxy', 'Ext.ux.ws.wamp.Store'],
	controllers: [ 'Items' ],
	autoCreateViewport: true,
	name: 'WA',
	
	launch: function() {
		var me = this;
		//Ext.WampMgr.setDebug(true);
		Ext.WampMgr.start();
	}
});
