/**
 * Override {@link Ext.form.Basic} of which provides input field management, validation, submission, and form loading services
 * This override does include additional logic to handle Wamp Form loading and form submission
 * Include this override to add Wamp Form loading and Form submission capability
 * 
 * @author dbs
 * @version V1.0 initial version
 * 
 * # Example usage
 *  @example
 *     var myFormPanel = new Ext.form.Panel({
 *         // configs for FormPanel
 *         title: 'Basic Information',
 *         renderTo: document.body,
 *         width: 300, height: 160,
 *         padding: 10,
 *         buttons:[{
 *             text: 'Submit',
 *             handler: function(){
 *                 myFormPanel.getForm().submit({
 *                     params: {
 *                         foo: 'bar',
 *                         uid: 34
 *                     }
 *                 });
 *             }
 *         }],
 *
 *         // configs apply to child items
 *         defaults: {anchor: '100%'},
 *         defaultType: 'textfield',
 *         items: [{
 *             fieldLabel: 'Name',
 *             name: 'name'
 *         },{
 *             fieldLabel: 'Email',
 *             name: 'email'
 *         },{
 *             fieldLabel: 'Company',
 *             name: 'company'
 *         }],
 *
 *         // Wamp configs for Wamp BasicForm
 *         api: {
 *         	   type: 'wamp',
 *             // The server-side Wamp method to call for load() requests
 *             load: 'news#load',
 *             // The server-side must mark the submit handler as a 'formHandler'
 *             submit: 'news#post'
 *         }
 *     });
 *     
 *     
 *     
 */
Ext.define('Ext.ux.ws.wamp.Basic', {
	override: 'Ext.form.Basic',
	uses: ['Ext.ux.ws.wamp.Submit','Ext.ux.ws.wamp.Load'],
	submit: function(options) {
        options = options || {};
        var me = this, action;
        if (this.api){
        	if(this.api.type === 'wamp'){
        		action = 'wampsubmit';
        		options.api = me.api;
        	}else
        		action = 'directsubmit';
        }else if (options.standardSubmit || me.standardSubmit)
            action = 'standardsubmit';
        else
            action = 'submit';
            
        return me.doAction(action, options);
    },
    load: function(options) {
    	var me = this, action;
        if (me.api)
        	if(me.api.type === 'wamp'){
        		action = 'wampload';
        		options.api = me.api;
        	}else
        		action = 'directload';
        else
            action = 'load';
        return me.doAction(action, options);
        //return this.doAction(this.api ? (this.api.type === 'wamp' ? 'wampload' : 'directload') : 'load', options);
    }
});