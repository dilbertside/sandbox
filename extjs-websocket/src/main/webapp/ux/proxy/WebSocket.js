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
    url : null,
    socket_request : null,


    doRequest : function(operation, callback, scope) {
        var me = this,
            request = this.buildRequest(operation),
            timeout = Ext.isDefined(request.timeout) ? request.timeout : me.timeout,
            url = operation.getRequest().getUrl();


        if (this.socket && url != me.url) {
            this.socket.close();
            delete this.socket;
            this.socket = null;
        }


        if (this.socket === null) {
            this.url = url;
            this.connect();
        }


        Ext.apply(request, {
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            disableCaching: false // explicitly set it to false, ServerProxy handles caching
        });


        operation.setStarted();
        this.socket_request = request;


        if (timeout > 0) {
            request.timeout = setTimeout(Ext.bind(me.handleTimeout, me, [request]), timeout);
        }
        return request;
    },


    onCloseHandler : function() {
        this.socket = null;
    },


    close : function() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    },


    connect : function() {
        if (this.socket === null) {
            var me = this;
            this.socket = new WebSocket(this.url);
            // put onmessage function in setTimeout to get around ios websocket crash
            this.socket.onmessage = function(evt) { setTimeout(function() {me.onMessageHandler(evt);}, 0); return me;};
            this.socket.onclose = function(evt) { me.onCloseHandler(); };
        }
    },


    onMessageHandler : function(evt) {
        if (this.socket_request.timeout) {
            clearTimeout(this.socket_request.timeout);
            this.socket_request.timeout = null;
        }


        var response = evt.data || '';
        this.fireEvent('requestcomplete', this, response, this.socket_request);
        this.handleResponse(response, this.socket_request);


        return this;
    },


    handleTimeout: function(request){
        if (this.socket_request.timeout) {
            clearTimeout(this.socket_request.timeout);
            this.socket_request.timeout = null;
        }


        Ext.Msg.alert('Server Not Responding',
                      'The server timed out when trying to data.',
                      Ext.emptyFn);


        request.errorType = 'timeout';
        this.handleResponse({responseText : '{ \'items\' : []}'}, request);
    },


    handleResponse: function(result, request){
        var success = true;
        // not sure what the point of this is.
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
            // console.log(arguments);
            // calls Ext.proxy.Server.processResponse which reads the response
            // calls the reader and converts everything into a model inst
            me.processResponse(success, operation, request, response, callback, scope);
        };
    }
});