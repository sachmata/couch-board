Ext.define('FV.controller.Orders', {
    extend: 'Ext.app.Controller',

    stores: ['Orders'],
    models: ['Order'],
    views: ['order.Add', 'order.View'],

    refs: [{
        ref: 'orderList',
        selector: 'orderlist'},
    {
        ref: 'orderData',
        selector: 'orderlist dataview'},
    {
        ref: 'orderShow',
        selector: 'ordershow'},
    {
        ref: 'orderForm',
        selector: 'orderwindow form'},
    {
        ref: 'orderIdText',
        selector: 'orderwindow textfield'},
    {
        ref: 'orderDescText',
        selector: 'orderwindow textareafield'},
    {
        ref: 'orderView',
        selector: 'orderview'},
    {
        ref: 'orderViewDesc',
        selector: 'orderview textareafield'},
    {
        ref: 'orderWindow',
        selector: 'orderwindow',
        autoCreate: true,
        xtype: 'orderwindow'}],

    requires: ['FV.lib.OrderValidator'],

    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function () {
        this.control({
            'orderlist dataview': {
                selectionchange: this.loadOrder
            },
            'orderlist button[action=add]': {
                click: this.addOrder
            },
            'orderlist button[action=remove]': {
                click: this.removeOrder
            },
            'orderwindow button[action=create]': {
                click: this.createOrder
            },
            'ordershow button[action=save]': {
                click: this.saveOrder
            }
        });
    },

    onLaunch: function () {
        var dataview = this.getOrderData(),
            store = this.getOrdersStore();

        store.load({
            scope: this,
            callback: function (records, operation, success) {
                dataview.bindStore(store);
                if (store.getCount() > 1) {
                    dataview.getSelectionModel().select(store.getAt(0));
                }
            }
        });
    },

    /**
     * Loads the given order into the viewer
     * @param {FV.model.order} order The order to load
     */
    loadOrder: function (selModel, selected) {
        this.selected = selected[0];

        var order = this.selected,
            desc = this.getOrderViewDesc();

        if (order) {
            desc.setValue(order.get('description'));
/*
            grid.enable();
            store.load({
                params: {
                    order: order.get('_id')
                }
            });
            */
        }
    },

    addOrder: function () {
        this.getOrderWindow().show();
    },

    removeOrder: function () {
        //this.getOrdersStore().remove(this.getOrderData().getSelectionModel().getSelection()[0]);
    },

    createOrder: function () {
        var win = this.getOrderWindow(),
            form = this.getOrderForm(),
            idText = this.getOrderIdText(),
            descText = this.getOrderDescText(),
            store = this.getOrdersStore(),
            order = this.getOrderModel().create({
                _id: idText.getValue(),
                description: descText.getValue(),
                type: 'order',
                created_at: new Date()
            });

        form.setLoading({
            msg: 'Validating order...'
        });

        FV.lib.OrderValidator.validate(order, {
            success: function () {
                store.add(order);
                store.sync();

                form.setLoading(false);
                win.hide();
            },
            failure: function () {
                form.setLoading(false);

                Ext.Msg.alert('Invalid Order');
            }
        });
    },

    saveOrder: function () {
        var order = this.selected,
            desc = this.getOrderViewDesc(),
            store = this.getOrdersStore(),
            view = this.getOrderView();

        if (order) {
            order.set('description', desc.getValue());

            view.setLoading({
                msg: 'Validating order...'
            });

            FV.lib.OrderValidator.validate(order, {
                scope: this,
                success: function () {
                    store.sync();

                    view.setLoading(false);
                },
                failure: function () {
                    view.setLoading(false);

                    Ext.Msg.alert('Invalid Order');
                }
            });
        }
    }
});
