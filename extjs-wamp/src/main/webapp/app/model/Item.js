Ext.define('WA.model.Item', {
	extend: 'Ext.data.Model',
	fields: ['title', 'author', {
        name: 'pubDate',
        type: 'int'
    }, 'link', 'description', 'content', 'encoded'],
    idProperty: 'pubDate',
	proxy: {
		type: 'wamp',
		prefix: 'news',
		api: {
			create: 'create',
			read: 'read',
			update: 'update',
			destroy: 'destroy',

			// Topic URIs for CRUD events
			oncreate: 'oncreate',
			onupdate: 'onupdate',
			ondestroy: 'ondestroy'
		}
	}
});