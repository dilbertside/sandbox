Ext.define('WA.view.FormPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formpanel',
	itemId: 'formPanel',
	bodyPadding: 10,
	title: 'Wamp form load and post',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	constructor: function(config) {
		Ext.applyIf(config, {
			api: {
				type: 'wamp',
				load: 'http://localhost:8080/extjs-wamp/news#load',
				submit: 'http://localhost:8080/extjs-wamp/news#post'
			},
			paramsAsHash: true
		});
		this.callParent(arguments);
	},

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {

			items: [ {
				xtype: 'textfield',
				name: 'title',
				fieldLabel: 'Title',
				allowBlank: false
			}, {
				xtype: 'datefield',
				name: 'pubDate',
				fieldLabel: 'Date',
				value: new Date(),
				submitFormat: 'time',
				altFormats: 'time',
				format: 'Y-m-d H:i:sO',
				allowBlank: false
			}, {
				xtype: 'textfield',
				name: 'encoded',
				fieldLabel: 'Text',
				flex: 1,
				allowBlank: false
			}, {
				xtype: 'textfield',
				name: 'author',
				fieldLabel: 'author',
				flex: 1,
				value: 'myself'
			} ],

			buttons: [ {
				xtype: 'button',
				text: 'Wamp Load',
				action: 'load'
			}, {
				text: 'Wamp Submit ',
				action: 'submit',
				disabled: true,
				formBind: true
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