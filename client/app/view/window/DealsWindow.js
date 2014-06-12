Ext.define('CRM.view.window.DealsWindow' ,{
	extend:'Ext.Window',
    alias: 'widget.dealsWindow',
	requires: ['CRM.view.form.DealsForm'],
	modal: true,
	title: 'Create Deal..',
	iconCls: 'icon-user',
	closeAction: 'hide',
	closable:true,
	bodyPadding: 10,
	width: 440,
	height:645,
	plain:false,
	layout: 'hbox',
	items: [{
		xtype: 'dealsForm',
		itemId: 'dealsForm'
	}],
	listeners: {
		scope: this,
		show: function(win){
			var myNewForm = Ext.ComponentQuery.query('#dealsForm')[0];
			myNewForm.getForm().reset();
			myNewForm.getForm().method = 'POST';
			win.title = 'Create Deal..';

			if(win.record !== undefined){				
				if(win.record.data._id != null){
					myNewForm.getForm().method = 'PUT';
					win.title = 'Update Deal..';
				}
				myNewForm.getForm().loadRecord(win.record);
			}
		}
	}
});