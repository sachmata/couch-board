Ext.define('FV.controller.Login', {
    extend: 'Ext.app.Controller',

    //stores: ['Orders'],
    //models: ['Order'],
    views: ['Login'],

    refs: [{
        ref: 'viewport',
        selector: 'viewport'},
    {
        ref: 'loginForm',
        selector: 'login form'},
    {
        ref: 'loginName',
        selector: 'login form name'},
    {
        ref: 'loginPassword',
        selector: 'login form password'}],

    //requires: ['FV.lib.OrderValidator'],
    init: function () {
        this.control({
            'login button[action=login]': {
                click: this.login
            }
        });
    },

    onLaunch: function () {},

    login: function () {
        var form = this.getLoginForm().getForm();
        if (form.isValid()) {
            form.errorReader = {
                read: function (response) {
                    var rs = Ext.decode(response.responseText);
                    return {
                        success: rs.ok === true
                    };
                }
            };

            form.submit({
                success: function (form, action) {
                    var viewport = this.getViewport();
                    viewport.showMain();
                    
                    //Ext.Msg.alert('Success', action.response.responseText);
                },
                failure: function (form, action) {
                    var rs = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', rs.reason);
                },
                scope: this
            });
        }
    }
});
