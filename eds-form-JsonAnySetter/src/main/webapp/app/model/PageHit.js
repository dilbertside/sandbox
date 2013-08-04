Ext.define('Starter.model.PageHit', {
	extend: 'Ext.data.Model',
	requires: [ 'Ext.data.UuidGenerator'],
	idgen: 'uuid',

	fields: [ {
		name: 'month',
		type: 'string'
	}, {
		name: 'hit',
		type: 'int'
	} ]

});