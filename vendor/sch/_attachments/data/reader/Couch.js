Ext.define('Sch.data.reader.Couch', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Sch.data.CouchReader',
    alias: 'reader.couch',

    root: 'rows',
    record: 'value',
    totalProperty: 'total_rows',

    readRecords: function (data) {
        if (data.id && data.rev && data.ok) { // create, update ? delete
            if (data.ok === true) {
                data = {
                    rows: [{
                        value: {
                            _id: data.id,
                            _rev: data.rev
                        }}]
                };
            }
        }
        else if (data._id && data._rev) { // select
            data = {
                rows: [{
                    value: data}]
            }
        }
        else { // view select
        }

        return this.callParent([data]);
    }
});
