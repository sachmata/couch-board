Ext.define('FV.store.Sessions', {
    extend: 'Ext.data.Store',

    requires: ['Ext.data.proxy.Ajax', 'Ext.data.reader.Json'],

    model: 'FV.model.Session',

    proxy: {
        type: 'ajax',
        url: '../../../_session',
        reader: {
            type: 'json',
            getResponseData: function (response) {
                var data = Ext.decode(response.responseText);
                return [data.userCtx];
            }
        }
    }
});
