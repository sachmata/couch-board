//TODO: Implement clean Couch proxy Ajax and Server are not good
Ext.define('Sch.data.proxy.Couch', {
    extend: 'Ext.data.proxy.Ajax',
    alternateClassName: 'Sch.data.CouchProxy',
    alias: 'proxy.couch',

    buildUrl: function (request) {
        var me = this,
            operation = request.operation,
            records = operation.records || [],
            record = records[0],
            url = me.getUrl(request),
            id = record ? record.getId() : operation.id;

        if (id) {
            if (!url.match(/\/$/)) {
                url += '/';
            }

            url += id;
        }

        request.url = url;

        return me.callParent(arguments);
    },

    //override
    processResponse: function (success, operation, request, response, callback, scope) {
        var me = this,
            reader, result, records, length, mc, record, i;

        if (success === true) {
            reader = me.getReader();
            result = reader.read(me.extractResponseData(response));
            records = result.records;
            length = records.length;

            if (result.success !== false) {
                mc = Ext.create('Ext.util.MixedCollection', true, function (r) {
                    return r.getId();
                });
                mc.addAll(operation.records);
                for (i = 0; i < length; i++) {
                    record = mc.get(records[i].getId());

                    if (record) {
                        record.beginEdit();
                        //ERROR
                        //record.set(record.data);
                        //FIX
                        //record.set(records[i].data);
                        //COUCH - update rev only
                        record.set('_rev', records[i].get('_rev'));
                        record.endEdit(true);
                    }
                }

                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response: response,
                    resultSet: result
                });

                operation.setCompleted();
                operation.setSuccessful();
            } else {
                operation.setException(result.message);
                me.fireEvent('exception', this, response, operation);
            }
        } else {
            me.setException(operation, response);
            me.fireEvent('exception', this, response, operation);
        }

        //this callback is the one that was passed to the 'read' or 'write' function above
        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }

        me.afterRequest(request, success);
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
