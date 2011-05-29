Ext.define('FV.store.Orders', {
    extend: 'Ext.data.Store',

    requires: ['Sch.data.proxy.Couch', 'Ext.data.reader.Json', 'Sch.data.writer.Couch'],

    model: 'FV.model.Order',

    proxy: {
        type: 'couch',
        url: '../../',
        api: {
            read: '_view/orders'
        },
        reader: {
            type: 'json',
            root: 'rows',
            record: 'value',
            totalProperty: 'total_rows'
        },
        writer: {
            type: 'couch'
        }
    },

    getNewRecords: function () {
        return this.data.filterBy(function (item) {
            return Ext.isEmpty(item.get('_rev')) && item.isValid();
        }).items;
    }
});
