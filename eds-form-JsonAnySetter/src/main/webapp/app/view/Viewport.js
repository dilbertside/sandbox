Ext.define('Starter.view.Viewport', {
	extend: 'Ext.Viewport',
	id: 'viewport',

	layout: {
		align: 'stretch',
		type: 'vbox'
	},

	requires: [ 'Starter.view.FormPanel*'],

	initComponent: function() {
		this.items = [ {
			xtype: 'container',
			layout: {
				align: 'stretch',
				type: 'hbox'
			},
			flex: 1,
			items: [ /*{
				xtype: 'storepanel',
				flex: 1,
				margins: 5
			}*/Ext.create('Starter.view.FormPanel3', {
				flex: 1,
				margins: 5
			}), Ext.create('Starter.view.FormPanel2', {
				flex: 1,
				margins: 5
			}) ]
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
			}),Ext.create('Starter.view.FormPanel4', {
				flex: 1,
				margins: 5
			}), /*{
				xtype: 'companytreepanel',
				flex: 1,
				margins: 5
			}*/ ]
		} ];

		this.callParent(arguments);
	}

});