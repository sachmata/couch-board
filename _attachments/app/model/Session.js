//root userCtx
Ext.define('FV.model.Session', {
    extend: 'Ext.data.Model',

    idProperty: 'name',

    fields: [{
        name: 'name',
        type: 'string'},
    {
        name: 'roles'}]
});
