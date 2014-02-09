/**
 * WAMP store for ExtJs Store {@link Ext.data.Store} which encapsulates a client side cache of Model objects
 * Extension to  {@link Ext.data.Store}
 * 
 * @author dbs
 * @see inspired from Tobias Oberstein https://github.com/tavendo/AutobahnExtJS
 * @see inspired from Ralph Schaer https://github.com/ralscha/spring4ws-demos
 * @version V1.0 initial version
 * @version V1.1 improvement doRequest for call when not connected, code cleanup
 */
Ext.define('Ext.ux.ws.wamp.Store', {
	extend: 'Ext.data.Store',
	alias: 'store.wamp',

	requires: [ 'Ext.ux.ws.wamp.Proxy' ],
	autoSync: false,

	constructor: function() {
		var me = this;
		me.callParent(arguments);
		var proxy = me.model.getProxy();
		me.mon(proxy,{
			scope: this,
			oncreate: proxy.api.oncreate ? me.onCreate : Ext.emptyFn,
			onupdate: proxy.api.onupdate ? me.onUpdate : Ext.emptyFn,
			ondestroy: proxy.api.ondestroy ? me.onDestroy : Ext.emptyFn
		});
	},
	/**
	 * @param proxy wamp proxy
	 * @param obj json object
	 */
	onCreate: function(proxy, obj) {
		var me = this, data = me.toArray(obj);
		me.suspendAutoSync();
		for ( var i = 0; i < data.length; i++) {
			var record = me.getById(data[i][me.model.prototype.idProperty]);
			if (record) {
				record.set(data[i]);
				record.commit();
			} else {
				var records = [ new me.model(data[i]) ], options = {
					addRecords: true,
					start: 0
				};
				me.loadRecords(records, options);
			}
			if (!(me.remoteSort || me.buffered)) {
				me.sort();
			}
			me.resumeAutoSync();
		}
	},
	/**
	 * @param proxy wamp proxy
	 * @param obj json object
	 */
	onUpdate: function(proxy, obj) {
		var me = this, data = me.toArray(obj);
		me.suspendAutoSync();
		for ( var i = 0; i < data.length; i++) {
			var record = me.getById(data[i][me.model.prototype.idProperty]);
			if (record) {
				record.set(data[i]);
				record.commit();
			}
		}
		if (!(me.remoteSort || me.buffered)) {
			me.sort();
		}
		me.resumeAutoSync();
	},
	/**
	 * @param proxy wamp proxy
	 * @param obj json object
	 */
	onDestroy: function(proxy, obj) {
		var me = this, data = me.toArray(obj);
		me.suspendAutoSync();
		for ( var i = 0; i < data.length; i++) {
			var record = me.getById(data[i][me.model.prototype.idProperty]);
			if (record) {
				me.remove(record);
			}
		}
		me.resumeAutoSync();
	},
	toArray: function(obj) {
		return Ext.isArray(obj) ? obj : [obj];
	}
});