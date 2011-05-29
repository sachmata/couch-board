Ext.define('Sch.data.writer.Couch', {
    extend: 'Ext.data.writer.Json',
    alternateClassName: 'Sch.data.CouchWriter',
    alias: 'writer.couch',

    getRecordData: function (record) {
        var nameProperty = this.nameProperty,
            fields = record.fields,
            data = {};

        fields.each(function (field) {
            if (field.persist) {
                var key = field[nameProperty] || field.name;
                var value = record.get(field.name);

                if (key !== '_id' && !Ext.isEmpty(value)) {
                    data[key] = value;
                }
            }
        });
        return data;
    }
});
