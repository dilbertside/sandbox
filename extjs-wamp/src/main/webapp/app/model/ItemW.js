Ext.define('WA.model.ItemW', {
	extend: 'Ext.data.Model',
	fields: ['title', 'author', {
        name: 'pubDate',
        type: 'int'
    }, 'link', 'description', 'content', 'encoded'],
    idProperty: 'pubDate',
	proxy: {
		type: 'wamp',
		api: {
			create: 'create',
			//read: 'read',
			//update: 'update',
			destroy: 'destroy',

			// Topic URIs for CRUD events
			oncreate: 'newsagency/joke/asean/*',
			//onupdate: 'onupdate',
			ondestroy: 'del/newsagency/joke/asean/*'
		}
	}
});