Ext.define('FV.view.order.Add', {
    extend: 'Ext.window.Window',

    alias: 'widget.orderwindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.HtmlEditor'],

    height: 220,
    width: 400,
    title: 'Add Order',
    closeAction: 'hide',
    iconCls: 'rss',
    layout: 'fit',

    initComponent: function () {
        Ext.apply(this, {
            buttons: [{
                text: 'Add order',
                action: 'create'},
            {
                text: 'Cancel',
                scope: this,
                handler: this.close}],

            items: [{
                xtype: 'form',
                bodyStyle: 'padding: 10px;',
                items: [{
                    itemId: 'orderId',
                    anchor: '0',
                    fieldLabel: 'Order Id',
                    labelAlign: 'top',
                    msgTarget: 'under',
                    xtype: 'textfield'},
                {
                    itemId: 'orderDesc',
                    anchor: '0',
                    fieldLabel: 'Description',
                    labelAlign: 'top',
                    msgTarget: 'under',
                    xtype: 'textareafield',
                    }]}]
        });

        this.callParent(arguments);
    }
});
