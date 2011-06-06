Ext.define('FV.controller.Orders', {
    extend: 'Ext.app.Controller',

    stores: ['Orders'],
    models: ['Order'],
    views: ['order.Add'],

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
        var desc = this.getOrderViewDesc(),
        //store = this.getArticlesStore(),
        order = selected[0];

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

    /**
     * Shows the add order dialog window
     */
    addOrder: function () {
        this.getOrderWindow().show();
    },

    /**
     * Removes the given order from the Orders store
     * @param {FV.model.Order} order The order to remove
     */
    removeOrder: function () {
        //this.getOrdersStore().remove(this.getOrderData().getSelectionModel().getSelection()[0]);
    },

    /**
     * @private
     * Creates a new order in the store based on a given url. First validates that the order is well formed
     * using FV.lib.OrderValidator.
     * @param {String} name The name of the Order to create
     * @param {String} url The url of the Order to create
     */
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
                form.down('[name=order]').markInvalid('The URL specified is not a valid RSS2 order.');
            }
        });
    }
});
