Ext.define('Starter.view.Viewport', {
	extend: 'Ext.Viewport',
	id: 'viewport',

	layout: {
		align: 'stretch',
		type: 'vbox'
	},

	requires: [ 'Starter.view.OpenConnection', 
	            'Starter.view.BroadcastConnection'
	          ],

	initComponent: function() {
		this.items = [{
			xtype: 'container' ,
			layout: {
				type: 'vbox' ,
				align: 'stretch'
			} ,
			width: 800 ,
			
			items: [{
				xtype: 'panel',
			
				title: 'Demo Ext.ux.WebSocket and Ext.ux.WebSocketManager' ,
		
				layout: {
					type: 'vbox' ,
					align: 'stretch'
				} ,
				
				items: [{
					xtype: 'container' ,
					layout: {
						type: 'hbox' ,
						align: 'stretch'
					} ,
					defaults: {
						bodyPadding: 5
					} ,
					items: [Ext.create ('Starter.view.OpenConnection'), Ext.create ('Starter.view.BroadcastConnection')]
				} , {
					xtype: 'panel' ,
					title: 'Connections' ,
					id: 'connections' ,
					layout: {
						type: 'vbox' ,
						align: 'stretch'
					}
				}]
			}]
		}];

		this.callParent(arguments);
	}

});