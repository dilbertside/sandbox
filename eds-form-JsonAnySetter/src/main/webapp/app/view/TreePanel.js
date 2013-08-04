Ext.define('Starter.view.TreePanel', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.companytreepanel',

	title: 'TREE_LOAD',
	store: Ext.create('Starter.store.Company'),
	rootVisible: false

});