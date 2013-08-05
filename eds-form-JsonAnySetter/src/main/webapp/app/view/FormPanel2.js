Ext.define('Starter.view.FormPanel2', {
	extend: 'Ext.form.Panel',
	itemId: 'formPanel2',
	bodyPadding: 10,
	title: 'FORM_LOAD, FORM_POST and SIMPLE, NO MULTIPART',

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	constructor: function(config) {
		Ext.applyIf(config, {
			api: {
				load: formLoadService.getFormData,
				submit: formSubmitService.handleFormSubmitNoMultipartFile
			},
			paramsAsHash: true,
			jsonSubmit: true
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
			}, {
				xtype: 'textfield',
				name: 'extra1',
				fieldLabel: 'Extra field 1 not part of bean FormBean',
				flex: 1,
				value: 'extra 1'
			}, {
				xtype: 'textfield',
				name: 'extra2',
				fieldLabel: 'Extra field 2 not part of bean FormBean',
				flex: 1,
				value: 'extra 2'
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