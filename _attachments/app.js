Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'FV': 'app',
        'Ext.ux': 'vendor/ext.ux',
        'Sch': 'vendor/sch'
    }
});

Ext.application({
    name: 'FV',
    controllers: [
        'Login',
        'Orders'],
    autoCreateViewport: true,
    launch: function () {
    }
});
