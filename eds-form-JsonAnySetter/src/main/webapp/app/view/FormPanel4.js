Ext.define('Starter.view.FormPanel4', {
	extend: 'Ext.form.Panel',
	itemId: 'formPanel4',
	bodyPadding: 10,
	title: 'FORM_LOAD, FORM_POST and SIMPLE, NO MULTIPART, standard',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	constructor: function(config) {
		Ext.applyIf(config, {
			api: {
				load: formLoadService.getFormData,
				submit: formSubmitService.handleFormSubmit
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
				name: 'osName',
				fieldLabel: 'OS Name',
				allowBlank: false
			}, {
				xtype: 'textfield',
				name: 'osVersion',
				fieldLabel: 'OS Version'
			}, {
				xtype: 'numberfield',
				name: 'availableProcessors',
				fieldLabel: 'Available Processors'
			}, {
				xtype: 'datefield',
				name: 'date',
				fieldLabel: 'Date',
				value: new Date()
			}, {
				xtype: 'textareafield',
				name: 'remarks',
				fieldLabel: 'Remarks',
				flex: 1
			} ],

			buttons: [ {
				xtype: 'button',
				action: 'simple',
				text: 'Call SIMPLE method'
			}, {
				xtype: 'button',
				text: 'Call FORM_LOAD method',
				action: 'form_load'
			}, {
				text: 'Submit',
				action: 'submit',
				disabled: true,
				formBind: true
			} ]

		});

		me.callParent(arguments);
	}

});