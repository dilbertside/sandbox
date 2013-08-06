/**
 * from http://www.sencha.com/forum/showthread.php?171515-WebSocket-to-push-data-to-a-view
 * how to use
	<code>
		 Ext.define('MyApp.store.MyStore', {
		    extend : 'Ext.data.Store',
		    alias : 'store.mystore',
		
		
		    model : 'MyApp.model.MyModel',
		
		
		    proxy : {
		        type : 'websocket',
		        url  : 'ws://websocketserver/controller/'
		        reader : {
		            type : 'json',
		            root : 'items'
		        }
		    },
		});
		
		
		var list = Ext.create('Ext.dataview.List', {
		    store : 'mystore',
		});
	</code>
 */
Ext.define('Ext.ux.proxy.WebSocket', {
    extend : 'Ext.data.proxy.Server',
    alias : 'proxy.websocket',


    socket : null,


    doRequest : function(operation, callback, scope) {
        var me = this,
            request = this.buildRequest(operation, callback, scope),
            timeout = Ext.isDefined(request.timeout) ? request.timeout : me.timeout,
            url = request.url;


        if (this.socket && url != this.socket.URL) {
            this.socket.close();
            delete this.socket;
            this.socket = null;
        }


        if (this.socket == null) {
            this.socket = new WebSocket(url);
            this.socket.onmessage = function(evt) { me.onMessageHandler(evt); };
            this.socket.onclose = function(evt) { alert('Closed Connection'); };
            this.socket.requestCallback = callback;
        }
        // else trigger a refresh request


        Ext.apply(request, {
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            disableCaching: false
        });


        operation.setStarted();
        this.socket.request = request;


        if (timeout > 0) {
            request.timeout = setTimeout(Ext.bind(me.handleTimeout, me, [request]), timeout);
        }
        return request;
    },


    onMessageHandler : function(evt) {
        var me = this,
            request = this.socket.request,
            operation = request.operation,
            responseText = evt.data,
            response;


        clearTimeout(request.timeout);
        response = {
            responseText : responseText,
        };


        me.fireEvent('requestcomplete', me, response, request);
        me.handleResponse(response, request)
    },


    handleTimeout: function(request){
        request.errorType = 'timeout';
        this.handleResponse({responseText : ''}, request);
    },


    handleResponse: function(result, request){
        var success = true;


        if (request.timeout) {
            clearTimeout(request.timeout);
        }


        // not sure what the point of this is but other examples do it.
        if (request.errorType) {
            success = false;
            Ext.callback(request.failure, request.scope, [request.errorType]);
        } else {
            Ext.callback(request.success, request.scope, [result]);
        }
        Ext.callback(request.callback, request.scope, [success, result, request.errorType]);
    },


    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        return function(success, response, errorType) {
            // calls Ext.proxy.Server.processResponse which reads the response
            // calls the reader and converts everything into a model inst
            me.processResponse(success, operation, request, response, callback, scope);
        };
    },
});