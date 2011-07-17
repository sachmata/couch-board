Ext.define('FV.view.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.main',

    requires: [
        'FV.view.Viewer',
        'FV.view.order.List',
        'Ext.layout.container.Border'],

    layout: 'border',

    items: [{
        region: 'center',
        xtype: 'viewer'},
    {
        region: 'west',
        xtype: 'orderlist',
        width: '25%'}]
});
