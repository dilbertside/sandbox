Ext.define('WA.controller.Items', {
	extend: 'Ext.app.Controller',
	views: [ 'GridItems', 'GridItemsW', 'FormPanel'],
	stores: [ 'Items', 'ItemsW'],
	models: [ 'Item', 'ItemW'],
	refs: [ {
		ref: 'status',
		selector: '#form-status'
	}],
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
		this.getStatus().showBusy();
		btn.up('form').getForm().load({
			scope: this,
			success: function(form, action){
				this.getStatus().setStatus({text: 'success form load', iconCls: 'x-status-valid'});
			},
			failure: function(form, action){
				this.getStatus().setStatus({text: 'error form load', iconCls: 'x-status-error'});
			}
		});
	},

	submit: function(btn) {
		this.getStatus().showBusy();
		btn.up('form').getForm().submit({
			scope: this,
			params: {
		        p1: 1000
		    },
			success: function(form, action) {
				this.getStatus().setStatus({text: 'success form submit', iconCls: 'x-status-valid'});
			},
			failure: function(form, action) {
				var err = 'error form submit, Server message: ' + action.result ? action.result.message : 'Error server';
				this.getStatus().setStatus({text: err, iconCls: 'x-status-error'});
			}
		});
	}
});