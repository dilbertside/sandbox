Ext.define('Starter.store.Company', {
	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	root: {
		expanded: true
	},

	proxy: {
		type: 'direct',
		directFn: treeLoadService.getTree
	}
});