Ext.define('WA.view.Viewport', {
	extend: 'Ext.Viewport',
	id: 'viewport',
	layout: {
		align: 'stretch',
		type: 'vbox'
	},
	requires: [ 'WA.view.GridItems'],

	initComponent: function() {
		this.items = [ {
			xtype: 'griditems',
			flex: 0.4
		},{
			xtype: 'griditemsw',
			flex: 0.4
		}, {
			xtype: 'formpanel',
			flex: 0.2
		} ];
		this.callParent(arguments);
	}

});