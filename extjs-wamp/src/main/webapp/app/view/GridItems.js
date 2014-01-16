Ext.define('WA.view.GridItems', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.griditems',
    requires:['Ext.ux.PreviewPlugin'],
    hideHeaders: true,
    autoScroll: true,
    title: 'News every 10 seconds, updated every minute, deleted every 2 minutes, wait and see',
    viewConfig: {
        preserveScrollOnRefresh: true,
        plugins: [{
            pluginId: 'preview',
            ptype: 'preview',
            bodyField: 'encoded',
            previewExpanded: true
        }]
    },
    store: 'Items',
    initComponent: function(){
        var me = this;
        me.listeners= {
            itemdblclick: me.onRowDblClick
        },
        me.tools = [{
            type: 'expand',
            tooltip: 'Expand Details',
            handler: function(e, t, pnl) {
                var p = pnl.ownerCt.getView().getPlugin('preview');
                p.toggleExpanded(true);
            }
        },{
            type: 'collapse',
            tooltip: 'Collapse Details',
            handler: function(e, t, pnl) {
                var p = pnl.ownerCt.getView().getPlugin('preview');
                p.toggleExpanded(false);
            }
        },{
            type: 'refresh',
            tooltip: 'Refresh RSS Feed',
            handler: function(e, t, pnl) {
                pnl.up('griditems').loadFeed();
            }
        }];
        me.columns = me.buildColumns();
        me.tbar = [{
        	text: 'connect Wamp server',
        	handler: function(me){
        		Ext.WampMgr.start();
        	}
        },'-',{
        	text: 'disconnect Wamp server',
        	handler: function(me){
        		Ext.WampMgr.stop();
        	}
        }];
        me.callParent(arguments);
        me.addEvents(
                /**
                 * @event rowdblclick
                 * Fires when a row is double clicked
                 * @param {FeedViewer.FeedGrid} this
                 * @param {Ext.data.Model} model
                 */
                'rowdblclick',
                /**
                 * @event select
                 * Fires when a grid row is selected
                 * @param {FeedViewer.FeedGrid} this
                 * @param {Ext.data.Model} model
                 */
                'select'
            );
        me.mon(me, 'selectionchange', me.onSelect, me);
    },

    /**
     * Reacts to a double click
     * @private
     * @param {Object} view The view
     * @param {Object} index The row index
     */
    onRowDblClick: function(view, record, item, index, e) {
        this.onSelect(this.store.getAt(index), this.getSelectionModel().getSelection());
        this.fireEvent('rowdblclick', this, this.store.getAt(index));
    },


    /**
     * React to a grid item being selected
     * @private
     * @param {Ext.model.Selection} model The selection model
     * @param {Array} selections An array of selections
     */
    onSelect: function(model, selections){
        var preview = this.getView().getPlugin('preview');
        preview.toggleExpanded(!preview.previewExpanded);
        var selected = selections[0];
        if (selected) {
            this.fireEvent('select', this, selected);
        }
    },

    /**
     * Instructs the grid to load a new feed
     * @param {String} url The url to load
     */
    loadFeed: function(url){
        if(url)
            this.store.getProxy().extraParams.feed = url;
        this.store.load();
    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record){
        return Ext.String.format('<div style="padding: 2px 0 0 10px;"><b>{0}</b></div>', value);
        //return Ext.String.format('<div style="padding: 2px 0 0 20px;"><b>{0}</b><br><span style="color: #333;">{1}</span></div>', value, record.get('author') || "Unknown");
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date){
        if (!date) {
            return '';
        }
        var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();
        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }
        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    },
    buildColumns: function(){
        return [{
            //text: 'Title',
            dataIndex: 'title',
            flex: 2,
            renderer: this.formatTitle,
            sortable: false
        }, {
            text: 'Author',
            dataIndex: 'author',
            hidden: true,
            width: 200,
            sortable: false

        }, {
            text: 'Pub date',
            dataIndex: 'pubDate',
            hidden: true,
            renderer: this.formatDate,
            flex: 1,
            sortable: true
        }];
    }
});