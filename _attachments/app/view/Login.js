Ext.define('FV.view.Login', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.login',
    cls: 'cb-login',

    //width: 350,
    //height: 130,
    border: false,

    requires: [
        'Ext.form.*'],

    layout: 'auto',

    initComponent: function () {
        this.callParent(arguments);
    },

    items: [{
        xtype: 'form',
        title: 'Valinor Board Login',
        bodyPadding: 5,

        url: '../../../_session',

        defaults: {
            xtype: 'textfield',
            anchor: '100%'
        },

        items: [{
            fieldLabel: 'Name',
            name: 'name',
            allowBlank: false},
        {
            inputType: 'password',
            fieldLabel: 'Password',
            name: 'password',
            allowBlank: false}],

        buttons: [{
            text: 'Login',
            action: 'login',
            formBind: true}]}]
});
