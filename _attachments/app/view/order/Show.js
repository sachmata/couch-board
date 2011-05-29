Ext.define('FV.view.order.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ordershow',

    requires: [
        'FV.view.order.View',
        'FV.view.supply.Grid',
        'FV.view.post.Grid'],

    closable: false,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'orderview',
                height: 100},
            {
                xtype: 'supplygrid',
                height: 150},
            {
                xtype: 'postgrid',
                height: 150}]
        });

        this.callParent(arguments);
    }
});
