Ext.define('FV.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',

    requires: ['FV.view.feed.Show', 'FV.view.order.Show'],

    activeItem: 0,
    margins: '5 5 5 5',

    cls: 'preview',

    initComponent: function () {
        this.items = [{
            xtype: 'ordershow',
            //xtype: 'feedshow',
            title: 'Valinor Board'}];

        this.callParent(arguments);
    }
});
