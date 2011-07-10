Ext.define('FV.store.Orders', {
    extend: 'Ext.data.Store',

    requires: ['Sch.data.proxy.Couch', 'Sch.data.reader.Couch', 'Sch.data.writer.Couch'],

    model: 'FV.model.Order',

    proxy: {
        type: 'couch',
        viewUrl: '_view/orders',
    },

    getNewRecords: function () {
        return this.data.filterBy(function (item) {
            return Ext.isEmpty(item.get('_rev')) && item.isValid();
        }).items;
    }
});
