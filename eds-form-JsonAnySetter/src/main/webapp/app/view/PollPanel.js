Ext.define('Starter.view.PollPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.pollpanel',

	title: 'POLL',
	layout: 'fit',

	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [ {
				xtype: 'chart',
				animate: true,
				insetPadding: 5,
				margin: '10 0 0 0',
				store: 'PageHits',
				axes: [ {
					type: 'Category',
					fields: [ 'month' ],
					position: 'bottom'
				}, {
					type: 'Numeric',
					fields: [ 'hit' ],
					position: 'left'
				} ],
				series: [ {
					type: 'column',
					label: {
						display: 'insideEnd',
						field: 'hit',
						color: '#333'
					},
					xField: 'month',
					yField: 'hit'
				} ]
			} ],
			dockedItems: [ {
				xtype: 'toolbar',
				dock: 'top',
				items: [ {
					text: 'Start Polling',
					action: 'start',
					disabled: true
				}, {
					text: 'Stop Polling',
					action: 'stop'
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});