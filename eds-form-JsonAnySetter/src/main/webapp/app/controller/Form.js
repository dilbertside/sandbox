Ext.define('Starter.controller.Form', {
	extend: 'Ext.app.Controller',

	views: [ 'FormPanel' ],

	refs: [ {
		ref: 'formPanel',
		selector: '#formPanel'
	} ],

	init: function() {
		this.control({
			'#formPanel button[action=form_load]': {
				click: this.load
			},
			'#formPanel button[action=submit]': {
				click: this.submit
			},
			'#formPanel button[action=simple]': {
				click: this.fillRemark
			}
		});
	},

	fillRemark: function() {
		formLoadService.getRemark(function(result) {
			this.getFormPanel().getForm().setValues({
				remarks: result
			});
		}, this);
	},

	load: function() {
		this.getFormPanel().getForm().load();
	},

	submit: function() {
		this.getFormPanel().getForm().submit({
			success: function(form, action) {
				this.getFormPanel().getForm().setValues({
					remarks: action.result.response
				});
			},
			scope: this
		});
	}

});