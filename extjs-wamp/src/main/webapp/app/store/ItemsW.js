Ext.define('WA.store.ItemsW', {
	extend: 'Ext.ux.ws.wamp.Store',
	model: 'WA.model.ItemW',
	autoLoad: true,
	remoteSort: false,
	autoSync: true,
	sorters : [ {
		property : 'pubDate',
		direction : 'DESC'
	} ]
});