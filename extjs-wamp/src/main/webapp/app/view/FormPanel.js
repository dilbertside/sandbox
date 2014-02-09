Ext.define('WA.view.FormPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formpanel',
	itemId: 'formPanel',
	bodyPadding: 10,
	title: 'Wamp form load and post',

	layout: {
		type: 'hbox',
		align: 'top'
	},

	constructor: function(config) {
		Ext.applyIf(config, {
			api: {
				type: 'wamp',
				load: 'http://localhost:8080/extjs-wamp/news#load',
				submit: 'http://localhost:8080/extjs-wamp/news#post'
			},
			paramsAsHash: true,
		});
		this.callParent(arguments);
	},

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			buttonAlign: 'right',
			bbar: Ext.create('Ext.ux.statusbar.StatusBar', {
		        id: 'form-status',
		        defaultText: 'Form Ready',
		        defaultIconCls: 'x-status-valid',
		        text: 'Form Ready',
		        iconCls: 'x-status-valid',
		        statusAlign: 'right',
		        items: [ '-', {
					xtype: 'button',
					text: 'Wamp load form',
					action: 'load'
				}, {
					text: 'Wamp submit form',
					action: 'submit',
					disabled: true,
					formBind: true
				}]
		    }),
			fieldDefaults: {
				labelAlign: 'top',
				margin: 5
			},
			items: [ {
				xtype: 'textfield',
				name: 'title',
				fieldLabel: 'Title',
				allowBlank: false,
				width: 300
			}, {
				xtype: 'datefield',
				name: 'pubDate',
				fieldLabel: 'Date',
				width: 200,
				//value: new Date(),
				submitFormat: 'time',
				altFormats: 'time',
				format: 'Y-m-d H:i:sO',
				//allowBlank: false,
				afterSubTpl: 'should be mandatory,<br> for testing purpose send empty,<br> submit will fail'
			}, {
				xtype: 'textarea',
				name: 'encoded',
				fieldLabel: 'Text',
				allowBlank: false,
				width: 300
			}, {
				xtype: 'textfield',
				name: 'author',
				fieldLabel: 'author',
				value: 'myself'
			} ]
		});

		me.callParent(arguments);
	},
	createForm: function() {
        var cfg = {},
            props = this.basicFormConfigs,
            len = props.length,
            i = 0,
            prop;
            
        for (; i < len; ++i) {
            prop = props[i];
            cfg[prop] = this[prop];
        }
        return new Ext.form.Basic(this, cfg);
    }

});