Ext.define ('Starter.view.OpenConnection', {
	extend: 'Ext.panel.Panel' ,
	
	title: 'Open a new connection' ,
	width: 300 ,
	layout: 'anchor' ,
	
	openConnection: function (obj) {
		var url = obj.up('panel').down('textfield').getValue ();
		
		var ws = Ext.create ('Ext.ux.WebSocket', {
			url: url ,
			listeners: {
				open: function (ws) {
					if (Ext.get(ws.url)) Ext.get(ws.url).dom.innerHTML += '> WebSocket just open!<br/>';
				} ,
				message: function (ws, data) {
					Ext.get(ws.url).dom.innerHTML += '> ' + data + '<br/>';
				} ,
				close: function (ws) {
					var panel = Ext.getCmp ('panel' + ws.url);
					
					if ((panel != null) || (panel != undefined)) {
						panel.destroy ();
					}
				}
			}
		});
		
		// Connection panel
		var panel = Ext.create ('Ext.panel.Panel', {
			title: url ,
			ws: ws ,
			id: 'panel' + url ,
			
			layout: 'anchor' ,
			
			bodyPadding: 5 ,
			collapsible: true ,
			
			items: [{
				xtype: 'container' ,
				html: 'Incoming from the server:<br/><div id="' + url + '" style="height: 60px; border: black solid 1px; padding: 5px; margin: 5px 0 5px 0; overflow: auto"></div>'
			} , {
				xtype: 'textarea' ,
				labelAlign: 'top' ,
				fieldLabel: 'Send a message' ,
				anchor: '100%'
			}] ,
			
			buttons: [{
				text: 'Reset' ,
				handler: function (btn, evt) {
					btn.up('panel').down('textarea').reset ();
				}
			} , {
				text: 'Send' ,
				handler: function (btn, evt) {
					btn.up('panel').ws.send(btn.up('panel').down('textarea').getValue ());
				}
			}] ,
			
			dockedItems: {
				xtype: 'toolbar' ,
				dock: 'top' ,
				defaults: {
					xtype: 'button'
				} ,
				items: [{
					// Registers to Ext.ux.WebSocketManager
					text: 'Register' ,
					handler: function (btn, evt) {
						if (btn.getText () === 'Register') {
							Ext.ux.WebSocketManager.register (btn.up('toolbar').up('panel').ws);
							btn.setText ('Unregister');
						}
						else {
							Ext.ux.WebSocketManager.unregister (btn.up('toolbar').up('panel').ws);
							btn.setText ('Register');
						}
					}
				} , {
					text: 'Close' ,
					handler: function (btn, evt) {
						btn.up('toolbar').up('panel').ws.close ();
						btn.up('toolbar').up('panel').destroy ();
					}
				}]
			}
		});
		
		Ext.getCmp('connections').add (panel);
	} ,
	
	items: [{
		xtype: 'textfield' ,
		anchor: '100%' ,
		fieldLabel: 'URL' ,
		labelAlign: 'top' ,
		value: 'ws://localhost:8080/echo',
		listeners: {
			specialKey: function (tf, evt) {
				if (evt.getKey () === evt.ENTER) {
					this.up('panel').openConnection (tf);
				}
			}
		}
	}] ,
	
	buttons: [{
		text: 'Reset' ,
		handler: function (btn, evt) {
			btn.up('panel').down('textfield').reset ();
		}
	} , {
		text: 'Open' ,
		handler: function (btn) {
			btn.up('panel').openConnection (btn);
		}
	}]
});