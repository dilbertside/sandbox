Ext.define('WA.controller.Items', {
	extend: 'Ext.app.Controller',

	views: [ 'GridItems', 'GridItemsW', 'FormPanel'],
	stores: [ 'Items', 'ItemsW'],
	models: [ 'Item', 'ItemW'],
	init: function() {
		this.control({
			'griditems': {
				activate: this.onActivate, //1st time and  tab selection
				afterrender: this.onAfterRender
			},
			'formpanel button[action=load]': {
				click: this.load
			},
			'formpanel button[action=submit]': {
				click: this.submit
			}
		});
	},
	onActivate: function(cmp, options) {
	},
	onAfterRender: function(cmp, options) {
	    var fd = cmp.down('griditems');
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
		        p1: 1000
		    },
			success: function(form, action) {
				console.log('success form load');
			},
			failure: function(form, action) {
				console.log('error form load' + action.result ? action.result.response : 'Error server');
			}
		});
	}
});