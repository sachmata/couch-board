Ext.define('FV.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',

    requires: ['FV.view.order.Show'],

    activeItem: 0,
    margins: '5 5 5 5',
    
    border: false,

    cls: 'cd-order-details',

    initComponent: function () {
        this.items = [{
            xtype: 'ordershow',
            title: 'Valinor Board'}];

        this.callParent(arguments);
    }
});
