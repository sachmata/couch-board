Ext.define('Sch.data.proxy.Couch', {
    extend: 'Ext.data.proxy.Ajax',
    alternateClassName: 'Sch.data.CouchProxy',
    alias: 'proxy.couch',

    /**
     * @cfg {Boolean} appendId True to automatically append the ID of a Model instance when performing a request based
     * on that single instance. See RestProxy intro docs for more details. Defaults to true.
     */
    appendId: true,

    /**
     * @cfg {String} format Optional data format to send to the server when making any request (e.g. 'json'). See the
     * RestProxy intro docs for full details. Defaults to undefined.
     */

    /**
     * @cfg {Boolean} batchActions True to batch actions of a particular type when synchronizing the store.
     * Defaults to <tt>false</tt>.
     */
    batchActions: false,

    /**
     * Specialized version of buildUrl that incorporates the {@link #appendId} and {@link #format} options into the
     * generated url. Override this to provide further customizations, but remember to call the superclass buildUrl
     * so that additional parameters like the cache buster string are appended
     */
    buildUrl: function (request) {
        var me = this,
            operation = request.operation,
            records = operation.records || [],
            record = records[0],
            format = me.format,
            url = me.getUrl(request),
            id = record ? record.getId() : operation.id;

        if (me.appendId && id) {
            if (!url.match(/\/$/)) {
                url += '/';
            }

            url += id;
        }

        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }

            url += format;
        }

        request.url = url;

        return me.callParent(arguments);
    }
}, function () {
    Ext.apply(this.prototype, {
        actionMethods: {
            create: 'PUT',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        }
    });
});
