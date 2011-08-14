Ext.define('FV.controller.Login', {
    extend: 'Ext.app.Controller',

    stores: [],
    models: [],
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
                    Ext.Ajax.request({
                        url: '../../../_session',
                        method: 'GET',
                        scope: this,
                        success: function (response) {
                            var data = Ext.decode(response.responseText);
                            if (data.ok === true) {
                                var session = data,
                                    credentials = form.getValues(),
                                    viewport = this.getViewport();

                                this.session = session;
                                this.credentials = credentials;

                                viewport.showMain();
                            }
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
    },
    
    
});
