Ext.define('FV.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',

    requires: [
        'FV.view.Main',
        'FV.view.Login',
        'Ext.layout.container.Card' /*Ext.ux.layout.Center*/ ],

    layout: 'card',
    /*ux.center*/

    items: [{
        xtype: 'login',
        itemId: 'login'},
    {
        xtype: 'main',
        itemId: 'main'}],

    initComponent: function () {
        this.callParent(arguments);
    },

    showMain: function () {
        this.getLayout().setActiveItem('main');
        
        //TODO: init main
    },
    showLogin: function () {
        this.getLayout().setActiveItem('login');
        
        //TODO: reset login
    }
});
