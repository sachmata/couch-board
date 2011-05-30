Ext.define('FV.view.order.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ordershow',

    requires: [
        'FV.view.order.View',
        'FV.view.order.Files',
        'FV.view.supply.Grid',
        'FV.view.post.Grid'],

    closable: false,

    layout: 'border',

    items: [{
        xtype: 'postgrid',
        region: 'center',
        margins: '0 0 0 5'},
    {
        xtype: 'orderfiles',
        region: 'south',
        height: 100,

        margins: '5 0 0 0'},
    {
        region: 'west',
        width: '40%',
        layout: 'border',
        border: false,
        items: [{
            xtype: 'orderview',
            region: 'north',
            height: 100,
            },
        {
            xtype: 'supplygrid',
            region: 'center',
            margins: '5 0 0 0'}]}],

    initComponent: function () {
        this.callParent(arguments);
    }
});
