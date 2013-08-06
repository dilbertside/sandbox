Ext.define ('Starter.view.BroadcastConnection', {
	extend: 'Ext.panel.Panel' ,
	
	title: 'Broadcast Connection' ,
	width: 500 ,
	layout: 'fit' ,
	
	items: [{
		xtype: 'textarea' ,
		fieldLabel: 'Broadcast a message' ,
		labelAlign: 'top' ,
	}] ,
	
	buttons: [{
		text: 'Close any connections' ,
		handler: function (btn, evt) {
			Ext.ux.WebSocketManager.closeAll ();
		}
	} , '->' , {
		text: 'Reset' ,
		handler: function (btn, evt) {
			btn.up('panel').down('textarea').reset ();
		}
	} , {
		// Broadcasts a message
		text: 'Send' ,
		handler: function (btn, evt) {
			Ext.ux.WebSocketManager.broadcast ('BROADCAST: ' + btn.up('panel').down('textarea').getValue ());
		}
	}]
});