Ext.define('Starter.controller.Form', {
	extend: 'Ext.app.Controller',

	views: [ 'FormPanel', 'FormPanel2' ],

	refs: [ {
		ref: 'formPanel',
		selector: '#formPanel'
	}, {
		ref: 'formPanel2',
		selector: '#formPanel2'
	} ],

	init: function() {
		this.control({
			'button[action=form_load]': {
				click: this.load
			},
			'button[action=submit]': {
				click: this.submit
			},
			'button[action=simple]': {
				click: this.fillRemark
			}
		});
	},

	fillRemark: function(btn) {
		formLoadService.getRemark(function(result) {
			this.getForm().setValues({
				remarks: result
			});
		}, btn.up('form'));
	},

	load: function(btn) {
		btn.up('form').getForm().load();
	},

	submit: function(btn) {
		btn.up('form').getForm().submit({
			headers:{
				'Content-Type': 'application/json;charset=UTF-8'
			},
			success: function(form, action) {
				form.setValues({
					remarks: action.result.response
				});
			},
			scope: this
		});
	}

});