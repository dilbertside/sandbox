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
			flex: 1
		},{
			xtype: 'griditemsw',
			flex: 1
		} ];
		this.callParent(arguments);
	}

});