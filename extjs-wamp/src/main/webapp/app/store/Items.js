Ext.define('WA.store.Items', {
	extend: 'Ext.ux.ws.wamp.Store',
	model: 'WA.model.Item',
	autoLoad: true,
	remoteSort: false,
	autoSync: true,
	sorters : [ {
		property : 'pubDate',
		direction : 'DESC'
	} ]
});