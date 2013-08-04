Ext.define('Starter.view.StorePanel', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.storepanel',

	title: 'STORE_READ and STORE_MODIFY',
	store: 'Users',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			columns: [ {
				xtype: 'gridcolumn',
				dataIndex: 'firstName',
				text: 'First Name',
				flex: 1,
				editor: {
					xtype: 'textfield',
					allowBlank: false
				}
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'lastName',
				text: 'Last Name',
				flex: 1,
				editor: {
					xtype: 'textfield',
					allowBlank: false
				}
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'email',
				text: 'Email',
				flex: 1,
				editor: {
					xtype: 'textfield',
					allowBlank: false,
					vtype: 'email'
				}
			} ],

			plugins: [ Ext.create('Ext.grid.plugin.RowEditing', {
				pluginId: 'storePanelRowEditing'
			}) ],

			dockedItems: [ {
				xtype: 'toolbar',
				dock: 'top',
				items: [ {
					text: 'New',
					action: 'new'
				}, {
					text: 'Delete',
					action: 'delete',
					disabled: true
				}, '->', {
					fieldLabel: 'Filter',
					labelWidth: 40,
					xtype: 'textfield',
					itemId: 'filtertextfield'
				} ]
			}, {
				xtype: 'pagingtoolbar',
				store: me.getStore(),
				dock: 'bottom',
				displayInfo: true
			} ]

		});

		me.callParent(arguments);
	}

});