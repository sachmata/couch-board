Ext.define('FV.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',

    requires: ['FV.view.order.Show'],

    activeItem: 0,
    margins: '5 5 5 5',

    border: false,

    initComponent: function () {
        this.callParent(arguments);
    },

    items: [{
        xtype: 'ordershow',
        title: 'Board'},
    /*{
        xtype: 'panel',
        title: 'Reports'}*/]
});
