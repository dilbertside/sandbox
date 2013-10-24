Ext.define('Starter.controller.Form', {
	extend: 'Ext.app.Controller',

	views: [ 'FormPanel', 'FormPanel2', 'FormPanel3', 'FormPanel4' ],
	models: ['Form'],

	refs: [ {
		ref: 'formPanel',
		selector: '#formPanel'
	}, {
		ref: 'formPanel2',
		selector: '#formPanel2'
	}],

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
		btn.up('form').getForm().load({
			scope: this,
			success: function(form, action){
				var record = this.getFormModel().create(action.result.data);
				//form.loadRecord(record);
			}
		});
	},

	submit: function(btn) {
		btn.up('form').getForm().submit({
			scope: this,
			params: {
		        p1: 1000,
		        p2: 'param 2'
		    },
			success: function(form, action) {
				form.setValues({
					remarks: action.result.response
				});
			},
			failure: function(form, action) {
				form.setValues({
					remarks: action.result ? action.result.response : 'Error server'
				});
			}
		});
	}

});