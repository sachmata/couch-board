Ext.define('FV.view.Login', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.login',
    cls: 'cb-login',

    border: false,

    requires: [
        'Ext.form.*'],
    //Ext.ux.layout.Center
    
    layout: 'auto',
    //ux.center
    
    initComponent: function () {
        this.callParent(arguments);
    },

    items: [{
        xtype: 'form',
        title: 'Valinor Board Login',
        width: 350,
        margin: 30,
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
