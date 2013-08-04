Ext.define('Starter.store.Users', {
	extend: 'Ext.data.Store',
	model: 'Starter.model.User',
	autoLoad: true,
	pageSize: 25,
	remoteSort: true,
	remoteFilter: true,
	autoSync: true,
	sorters: [ {
		property: 'lastName',
		direction: 'ASC'
	} ]
});