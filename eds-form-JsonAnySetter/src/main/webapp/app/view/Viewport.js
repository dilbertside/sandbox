Ext.define('Starter.view.Viewport', {
	extend: 'Ext.Viewport',
	id: 'viewport',

	layout: {
		align: 'stretch',
		type: 'vbox'
	},

	requires: [ 'Starter.view.StorePanel', 
	            'Starter.view.PollPanel', 
	            'Starter.view.FormPanel',
			    'Starter.view.TreePanel' ],

	initComponent: function() {
		this.items = [ {
			xtype: 'container',
			layout: {
				align: 'stretch',
				type: 'hbox'
			},
			flex: 1,
			items: [ {
				xtype: 'storepanel',
				flex: 1,
				margins: 5
			}, {
				xtype: 'pollpanel',
				flex: 1,
				margins: 5
			} ]
		}, {
			xtype: 'container',
			layout: {
				align: 'stretch',
				type: 'hbox'
			},
			flex: 1,
			items: [ Ext.create('Starter.view.FormPanel', {
				flex: 1,
				margins: 5
			}), {
				xtype: 'companytreepanel',
				flex: 1,
				margins: 5
			} ]
		} ];

		this.callParent(arguments);
	}

});