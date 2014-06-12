Ext.define('CRM.view.window.DealsWindowPreview' ,{
	extend:'Ext.Window',
    alias: 'widget.dealsWindowPreview',
	requires: ['CRM.view.deals.GridPanelPreview'],
	modal: true,
	title: 'Deal Import Preview..',
	iconCls: 'icon-user',
	closeAction: 'hide',
	closable:true,
	bodyPadding: 5,
	width: 970,
	height:480,
	plain:false,
	layout: 'vbox',
	items: [{
		xtype: 'dealsGridPanelPreview',
		itemId: 'dealsGridPanelPreview'
	}, {
		xtype: 'panel',
		layout: {
			type: 'hbox',
			pack: 'start',
			align: 'right'
		},
		frame: false,
		border: false,
		bodyStyle: 'background:transparent;',
		itemId : 'previewToolbarPanel',
		//align: 'center',
		margin: '10 0 0 850',
		items : [{
				xtype : 'button',
				text : 'Cancel',
				//iconCls: 'icon-cancel'
			},{
				xtype : 'button',
				text : 'Save',
				//iconCls: 'icon-save',
				margin: '0 0 0 10',
			}
		]
	}],
	listeners: {
		scope: this,
		show: function(win){
			var grid = Ext.ComponentQuery.query('#dealsGridPanelPreview')[0];
			grid.getStore().loadData(win.data, false);
		}
	}
});