Ext.define('FV.view.order.List', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.orderlist',

    requires: ['Ext.toolbar.Toolbar'],

	title: 'Orders',
	collapsible: true,
	animCollapse: true,
	margins: '5 0 5 5',
	layout: 'fit',

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'dataview',
				trackOver: true,
				store: this.store,
				cls: 'order-list',
				itemSelector: '.order-list-item',
				overItemCls: 'order-list-item-hover',
				tpl: '<tpl for="."><div class="order-list-item">{_id}</div></tpl>',
				listeners: {
				    selectionchange: this.onSelectionChange,
				    scope: this
				}
			}],

			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					text: 'Add Order',
					action: 'add'
				}, {
					text: 'Remove Order',
					disabled: true,
					action: 'remove'
				}]
			}]
		});

		this.callParent(arguments);
	},
	
	onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
	}
});
