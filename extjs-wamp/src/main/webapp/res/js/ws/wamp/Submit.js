/**
 * Provides {@link Ext.ux.ws.wamp.Manager} support for submit form data.
 * Extension to  {@link Ext.form.action.Submit} to implement Wamp form submit
 * 
 * @author dbs
 * @see inspired from Tobias Oberstein https://github.com/tavendo/AutobahnExtJS
 * @version V1.0 initial version
 */
Ext.define('Ext.ux.ws.wamp.Submit', {
    extend: 'Ext.form.action.Submit',
    alias: 'formaction.wampsubmit',

    type: 'wampsubmit',

    doSubmit: function() {
    	var me = this, params = me.getParams('jsonData');

        if(me.api.submit && Ext.WampMgr.isActive()) {
        	var formInfo = me.buildForm();
        	Ext.WampMgr.call(me.api.submit, params, me.onSuccess, me.onFailure, me);
        	me.cleanup(formInfo);
        } else {
        	me.onFailure(null);
        }
    },
    /**
     * Wamp actions have already been processed and therefore we can directly set the result
     * @private
     */
    processResponse: function(result) {
    	result = result || {};
    	return (this.result = (result.result || result));
    }
});