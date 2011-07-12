Ext.define('Sch.data.proxy.Couch', {
    extend: 'Ext.data.proxy.Proxy',
    alternateClassName: 'Sch.data.CouchProxy',
    alias: 'proxy.couch',

    defaultReaderType: 'couch',
    defaultWriterType: 'couch',

    //uses: ['Ext.data.Request'],
    requires: ['Ext.data.Request', 'Sch.data.reader.Couch', 'Sch.data.writer.Couch'],

    timeout: 30000,

    actionMethods: {
        create: 'PUT',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    },

    //viewUrl: '_view/orders',
    dbUrl: '../../',

    constructor: function (config) {
        config = config || {};

        this.addEvents(
        /**
         * @event exception
         * Fires when the server returns an exception
         * @param {Ext.data.proxy.Proxy} this
         * @param {Object} response The response from the AJAX request
         * @param {Ext.data.Operation} operation The operation that triggered request
         */
        'exception');

        this.callParent([config]);
    },

    create: function (operation, cb, sc) {
        var request = this.buildRequest(operation);

        if (operation.allowWrite()) {
            request = this.getWriter().write(request);
        }

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, cb, sc),
            method: this.getMethod(request),
            disableCaching: false
        });

        Ext.Ajax.request(request);

        return request;
    },

    read: function (operation, cb, sc) {
        var isViewOp = !operation.id,
            request = this[isViewOp ? 'buildViewRequest' : 'buildRequest'](operation);

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, cb, sc),
            method: this.getMethod(request),
            disableCaching: false
        });

        Ext.Ajax.request(request);

        return request;
    },

    update: function (operation, cb, sc) {
        var request = this.buildRequest(operation);

        if (operation.allowWrite()) {
            request = this.getWriter().write(request);
        }

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, cb, sc),
            method: this.getMethod(request),
            disableCaching: false
        });

        Ext.Ajax.request(request);

        return request;
    },

    destroy: function (operation, cb, sc) {
        var request = this.buildRequest(operation);

        if (operation.allowWrite()) {
            request = this.getWriter().write(request);
        }

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, cb, sc),
            method: this.getMethod(request),
            disableCaching: false
        });

        Ext.Ajax.request(request);

        return request;
    },

    buildRequest: function (operation) {
        var request = Ext.create('Ext.data.Request', {
            params: Ext.applyIf(operation.params || {}, {
                id: operation.id
            }),
            action: operation.action,
            operation: operation,
            url: this.buildIdUrl(operation)
        });

        operation.request = request;

        return request;
    },

    buildViewRequest: function (operation) {
        var request = Ext.create('Ext.data.Request', {
            params: operation.params || {},
            action: operation.action,
            operation: operation,
            url: this.buildViewUrl(operation) //TODO: encode filters etc.
        });

        operation.request = request;

        return request;
    },

    buildViewUrl: function (operation) {
/*
        if (!this.dbUrl) {
            Ext.Error.raise("NoCouchProxyDbUrl");
        }
*/
        if (!this.viewUrl) {
            Ext.Error.raise("NoCouchProxyViewUrl");
        }

        //TODO: check for / url.match(/\/$/) /*this.dbUrl + */
        return this.viewUrl;
    },

    buildIdUrl: function (operation) {
        if (!this.dbUrl) {
            Ext.Error.raise("NoCouchProxyDbUrl");
        }

        var records = operation.records || [],
            record = records[0],
            id = record ? record.getId() : operation.id;

        if (!id) {
            Ext.Error.raise("NoCouchProxyRecId");
        }

        //TODO: check for / url.match(/\/$/)
        return this.dbUrl + id;
    },

    createRequestCallback: function (request, operation, callback, scope) {
        var me = this;

        return function (options, success, response) {
            me.processResponse(success, operation, request, response, callback, scope);
        };
    },

    processResponse: function (success, operation, request, response, callback, scope) {
        var me = this,
            reader, result, records, length, mc, respRecord, operRecord, i;

        if (success === true) {
            reader = me.getReader();
            result = reader.read(response);
            records = result.records;
            length = records.length;

            if (result.success !== false) {
                if (operation.records && operation.records.length > 0) { // insert, update ? delete
                    mc = Ext.create('Ext.util.MixedCollection', true, function (r) {
                        return r.getId();
                    });
                    mc.addAll(operation.records);
                    for (i = 0; i < length; i++) {
                        respRecord = records[i];
                        operRecord = mc.get(respRecord.getId());
                        if (operRecord) {
                            operRecord.set('_rev', respRecord.get('_rev'));
                            operRecord.commit();
                        }
                    }
                }
                else { // select
                    Ext.apply(operation, {
                        resultSet: result
                    });
                }

                Ext.apply(operation, {
                    response: response,
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

        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }

        me.afterRequest(request, success);
    },

    setException: function (operation, response) {
        operation.setException({
            status: response.status,
            statusText: response.statusText
        });
    },

    extractResponseData: function (response) {
        return response;
    },

    doRequest: function (operation, callback, scope) {
        var request = this.buildRequest(operation, callback, scope);

        if (operation.allowWrite()) {
            request = this.getWriter().write(request);
        }

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createDocRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
            disableCaching: false
        });

        Ext.Ajax.request(request);

        return request;
    },

    getMethod: function (request) {
        return this.actionMethods[request.action];
    },

    afterRequest: Ext.emptyFn,

    onDestroy: function () {
        Ext.destroy(this.reader, this.writer);
    }
});
