Ext.define('FV.view.order.View', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.orderview',

    requires: ['Ext.toolbar.Toolbar'],

    cls: 'order-view',

    border: false,

    layout: 'fit',

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'textarea',
                fieldLabel: 'Description',
                name: 'description',
                border: false,
                hideLabel: true}],

            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    text: 'Save',
                    action: 'save'}]}]
        });

        this.callParent(arguments);
    }
});
