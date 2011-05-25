Ext.define('FV.model.Order', {
    extend: 'Ext.data.Model',

    idProperty: '_id',

    fields: [
        {
        name: '_id',
        type: 'string'},
    {
        name: '_rev',
        type: 'string'},
    {
        name: 'type',
        type: 'string'},
    {
        name: 'description',
        type: 'string'},
    {
        name: 'created_at',
        type: 'date'},
    {
        name: 'created_by',
        type: 'string'}
    ]
});
