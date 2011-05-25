Ext.define('FV.store.Orders', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.reader.Json'],

    model: 'FV.model.Order',

    proxy: {
        type: 'rest',
        url: '../../',
        api: {
            read: '_view/orders'
        },
        reader: {
            type: 'json',
            root: 'rows',
            record: 'value',
            totalProperty: 'total_rows'
        }
    },

    getNewRecords: function () {
        return this.data.filterBy(function (item) {
            return Ext.isEmpty(item.get('_rev')) && item.isValid();
        }).items;
    }
});

Ext.override(Ext.data.proxy.Rest, {
    actionMethods: {
        create: 'PUT',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    }
});
