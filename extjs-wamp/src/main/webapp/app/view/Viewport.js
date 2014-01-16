Ext.define('WA.view.Viewport', {
	extend: 'Ext.Viewport',
	id: 'viewport',
	layout: {
		//align: 'stretch',
		type: 'fit'
	},
	requires: [ 'WA.view.GridItems'],

	initComponent: function() {
		this.items = [ {
			xtype: 'griditems',
		} ];
		this.callParent(arguments);
	}

});