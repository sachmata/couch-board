Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'FV': 'app',
        'Ext.ux': 'vendor/ext.ux'
    }
});

Ext.application({
    name: 'FV',
    controllers: [
        'Articles',
        //'Feeds',
        'Orders'],
    launch: function () {}
});
