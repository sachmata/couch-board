Ext.define('FV.view.order.View', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orderview',

    requires: ['Ext.toolbar.Toolbar'],

    cls: 'cb-order-view',

    layout: 'fit',

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'textareafield',
                fieldLabel: 'Description',
                name: 'description',
                border: false,
                hideLabel: true}]
        });

        this.callParent(arguments);
    }
});
