/**
 * Provides {@link Ext.ux.ws.wamp.Manager} support for loading form data.
 * Extension to  {@link Ext.form.action.Load} to implement Wamp form loading
 * 
 * @author dbs
 * @see inspired from Tobias Oberstein https://github.com/tavendo/AutobahnExtJS
 * @version V1.0 initial version
 */
Ext.define('Ext.ux.ws.wamp.Load', {
    extend: 'Ext.form.action.Load',
    alias: 'formaction.wampload',

    type: 'wampload',

    run: function() {
        var me = this, params = me.getParams();
        if(me.api.load && Ext.WampMgr.isActive()) {
        	Ext.WampMgr.call(me.api.load, params, me.onSuccess, me.onFailure, me);
        } else {
        	me.failureType = Ext.form.action.Action.CONNECT_FAILURE;
        	me.form.afterAction(me, false);
        }
    },
    /**
     * @private
     */
    onSuccess: function(response){
        var result = this.processResponse(response), form = this.form;
        if (result === true || !result.success || !result.data) {
            this.failureType = Ext.form.action.Action.LOAD_FAILURE;
            form.afterAction(this, false);
            return;
        }
        form.clearInvalid();
        form.setValues(result.data);
        form.afterAction(this, true);
    },
    /**
     * @private
     */
    processResponse: function(result) {
    	return {
            success : result.success,
            data : Ext.isArray(result.data) ? result.data[0] : result.data
        };
    }
});
