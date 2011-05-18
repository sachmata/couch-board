Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'FV': 'app',
        'Ext.ux': 'vendor/ext.ux'
    }
});

Ext.application({
    name: 'FV',
    controllers: [
        'Articles',
        'Feeds'],
    launch: function () {}
});
