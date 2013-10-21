Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});


Ext.require('Ext.direct.*', function() {
	var chartDataPoller = Ext.create('Ext.direct.PollingProvider', {
		id: 'chartDataPoller',
		type: 'polling',
		interval: 5 * 1000, // 5 seconds
		url: Ext.app.POLLING_URLS.chart
	});

	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, chartDataPoller);
	Ext.direct.Manager.getProvider('chartDataPoller').disconnect();
});

Ext.define('DirectSubmitEXTJSIV-9955', {
	override: 'Ext.form.action.DirectSubmit',
	doSubmit: function() {
		var me = this,
		form = me.form,
		api = form.api,
		fn = api.submit,
		callback = Ext.Function.bind(me.onComplete, me),
		formInfo,
		params,
		options;
		
		if (typeof fn !== 'function') {
			//
			var fnName = fn;
			//
			
			api.submit = fn = Ext.direct.Manager.parseMethod(fn);
			
			//
			if (!Ext.isFunction(fn)) {
				Ext.Error.raise('Cannot resolve Ext.Direct API method ' + fnName);
			}
			//
		}
		
		if (me.timeout || form.timeout) {
			options = {
					timeout: me.timeout * 1000 || form.timeout * 1000
			};
		}
		
		if (fn.directCfg.method.formHandler) {
			formInfo = me.buildForm();
			params = formInfo.formEl;
		} else {
			// Use model values, sending as json
			params = me.getParams(true);
		}
		
		fn.call(window, params, callback, me, options);
		if (formInfo) {
			me.cleanup(formInfo);
		}
	}
});

Ext.application({
	controllers: [ 'Poll', 'User', 'Form' ],
	autoCreateViewport: true,
	name: 'Starter',
	launch: function() {
		Ext.fly('appLoadingIndicator').destroy();
	}
});
