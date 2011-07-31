Ext.define('FV.controller.Login', {
    extend: 'Ext.app.Controller',

    stores: ['Sessions'],
    models: ['Session'],
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
            'login': {
                activate: this.reset
            },
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
                    var store = this.getSessionsStore();
                    store.load({
                        scope: this,
                        callback: function (records, operation, success) {
                            var session = records[0],
                                viewport = this.getViewport();
                            //this.session = session;
                            viewport.session = session;
                            viewport.showMain();
                        }
                    });
                },
                failure: function (form, action) {
                    var rs = Ext.decode(action.response.responseText);
                    Ext.Msg.alert('Failed', rs.reason);
                },
                scope: this
            });
        }
    },

    reset: function () {
        var form = this.getLoginForm().getForm();
        form.reset();
    }
});
