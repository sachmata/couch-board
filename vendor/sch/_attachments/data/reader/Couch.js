Ext.define('Sch.data.reader.Couch', {
    extend: 'Ext.data.reader.Json',
    alternateClassName: 'Sch.data.CouchReader',
    alias: 'reader.couch',

    readRecords: function (data) {
        // confirm result on insert or update
        if (data.ok && data.ok === true) {
            data = {
                rows: [{
                    value: {
                        _id: data.id,
                        _rev: data.rev
                    }}]
            };
        }

        return this.callParent([data]);
    }
});
