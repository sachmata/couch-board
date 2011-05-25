Ext.define('FV.lib.OrderValidator', {
    singleton: true,

    /**
     * Validates a given order
     * @param {FV.model.Order} order The order to validate
     */
    validate: function (order, options) {
        options = options || {};

        Ext.applyIf(options, {
            scope: this,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });

        //HACK
        options.success.call(options.scope, order);

        /*
        Ext.Ajax.request({
            url: this.url,
            params: {
                order: order.get('url')
            },
            scope: this,
            success: function (response) {
                options.success.call(options.scope, order);
            },
            failure: function () {
                options.failure.call(options.scope);
            }
        });
        */
    }
});
