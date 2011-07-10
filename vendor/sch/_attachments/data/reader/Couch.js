Ext.define('Sch.data.reader.Couch', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Sch.data.CouchReader',
    alias: 'reader.couch',

    root: 'rows',
    record: 'value',
    totalProperty: 'total_rows',

    readRecords: function (data) {
        //single document
        if (data._id && data._rev) {
            //TODO: ? delete
            // create or update
            if (data.ok) {
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
            // select
            else {
                data = {
                    rows: [{
                        value: data}]
                }
            }
        }

        return this.callParent([data]);
    }
});
