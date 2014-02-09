/**
 * WAMP proxy for Stores to handle the loading and saving of Model data
 * Extension to  {@link Ext.data.proxy.Server}
 * 
 * @author dbs
 * @see inspired from Tobias Oberstein https://github.com/tavendo/AutobahnExtJS
 * @see inspired from Ralph Schaer https://github.com/ralscha/spring4ws-demos
 * @version V1.0 initial version
 * @version V1.1 improvement doRequest for call when not connected, code cleanup
 */
Ext.define('Ext.ux.ws.wamp.Proxy', {
	extend: 'Ext.data.proxy.Server',
	alias: 'proxy.wamp',
	/*
	 * prefix to use
	 */
	prefix: null,
	constructor: function(config) {
		var me = this;
		config = config || {};

		me.addEvents(
		/**
		 * @event exception Fires when the WAMP server returns an exception in response to a RPC
		 * @param {Ext.data.proxy.Proxy} this
		 * @param {Object} error The WAMP error object returned for the RPC
		 * @param {Ext.data.Operation} operation The operation that triggered request
		 */
		'exception',

		/**
		 * @event oncreate Fires when an object was (remotely) created
		 * @param {Ext.data.proxy.Proxy} this
		 * @param {Object} event or array of event object(s) created
		 */
		'oncreate',

		/**
		 * @event onupdate Fires when an object was (remotely) update
		 * @param {Ext.data.proxy.Proxy} this
		 * @param {Object} event or array of event object(s) delta for the update (plus the object ID)
		 */
		'onupdate',

		/**
		 * @event ondestroy Fires when an object was (remotely) deleted
		 * @param {Ext.data.proxy.Proxy} this
		 * @param {Object} id or array of id ID(s) of the object deleted
		 */
		'ondestroy');

		me.callParent([ config ]);
		me.api = Ext.apply({}, config.api || me.api);

		if(Ext.WampMgr.isActive()){
			me.session = Ext.WampMgr.absession;
			me.register(me);
		}else{
			Ext.WampMgr.on('connect', function(sess) {
				me.session = sess;
	            this.register(me);
	        }, me, {single: true});
		}
		
	},
	register: function(me){
		Ext.WampMgr.regPrefix(me.prefix);//by default we register curie, neutral if not set
		if (me.api.oncreate) {
			Ext.WampMgr.subscribe(me.prefix, me.api.oncreate, function(topic, event) {
				me.fireEvent('oncreate', me, event);
			});
		}

		if (me.api.onupdate) {
			Ext.WampMgr.subscribe(me.prefix, me.api.onupdate, function(topic, event) {
				me.fireEvent('onupdate', me, event);
			});
		}

		if (me.api.ondestroy) {
			Ext.WampMgr.subscribe(me.prefix, me.api.ondestroy, function(topic, id) {
				me.fireEvent('ondestroy', me, id);
			});
		}
	},
	doRequest: function(operation, callback, scope) {
		var me = this, writer = me.getWriter(), request = me.buildRequest(operation), params, fn;

		fn = Ext.String.format('{0}:{1}', me.prefix, me.api[request.action]);

		if (operation.allowWrite()) {
			request = writer.write(request);
		}

		if (operation.action == 'read') {
			params = request.params;
		} else {
			params = request.jsonData;
		}
		if(!Ext.WampMgr.call(fn, params, function(response) {
			me.processResponse(true, operation, request, response, callback, scope);
		}, function(err) {
			me.processResponse(false, operation, request, err, callback, scope);
		}, me))
			me.processResponse(false, operation, request, {success: false, message: 'No wamp session'}, callback, scope);
	},

	buildRequest: function(operation) {
		var me = this, params = operation.params = Ext.apply({}, operation.params, me.extraParams), request;

		Ext.applyIf(params, me.getParams(operation));

		if (operation.id !== undefined && params[me.idParam] === undefined) {
			params[me.idParam] = operation.id;
		}

		request = new Ext.data.Request({
			params: params,
			action: operation.action,
			records: operation.records,
			operation: operation
		});

		operation.request = request;
		return request;
	}

});