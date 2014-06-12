Ext.define('CRM.view.form.DealsForm', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.dealsForm',
	title : "",
	width : 410,
	frame : true,
	formBind : true,
	fieldDefaults : {
		labelAlign : "top",
		width : 200,
		grow : false,
		allowBlank : false,
	},
	reader : {
		model : 'Deal',
		type : 'json',
		root : 'data'
	},
	method : 'post',
	waitMsg : 'Creating Record...',
	jsonSubmit : true,
	url : '/collections/deals/',
	items : [

		new Ext.form.field.Hidden({
			name : "_id"
		}),
		new Ext.form.field.Text({
			fieldLabel : "Name",
			name : "dealname",
			width : 400,
			blankText : "Please enter the Deal name."
		}),
		new Ext.form.field.Text({
			fieldLabel : "Broker",
			name : "brokername",
			width : 400,
			blankText : "Please enter the Broker."
		}),
		new Ext.form.field.Text({
			fieldLabel : "Customer",
			name : "customername",
			width : 400,
			blankText : "Please enter the Customer."
		}),
		new Ext.form.field.ComboBox({
			fieldLabel : "Type",
			name : "dealtype",
			width : 400,
			blankText : "Please enter the Deal type.",
			typeAhead: true,
			triggerAction: 'all',
			store: 'DealTypes',
			queryMode: 'local',
			//data: 'DealStatus',
			displayField: 'meaning',
			valueField: 'type',
			editable: false,
			forceSelection: true
		}),
		new Ext.form.field.Date({
			fieldLabel : "Start Date",
			name : "dealstartdate",
			blankText : "Please enter the deal start date."
		}),
		new Ext.form.field.Date({
			fieldLabel : "End Date",
			name : "dealenddate",
			blankText : "Please enter the deal end date."
		}),
		new Ext.form.field.Text({
			fieldLabel : "Deal",
			name : "deal",
			width : 400,
			blankText : "Please enter the Deal."
		}),
		new Ext.form.field.TextArea({
			fieldLabel : "Comments",
			name : "comments",
			width : 400,
			allowBlank : true
		}),
		new Ext.form.field.ComboBox({
			fieldLabel : "Status",
			name : "status",
			width : 400,
			blankText : "Please enter the Deal status.",
			typeAhead: true,
			triggerAction: 'all',
			store: 'DealStatus',
			queryMode: 'local',
			//data: 'DealStatus',
			displayField: 'meaning',
			valueField: 'status',
			editable: false,
			forceSelection: true
		}),
		new Ext.form.field.Number({
			fieldLabel : "Lumpsum",
			name : "lumpsum",
			blankText : "Please enter the Deal Lumpsum"
		}),
		new Ext.form.field.Number({
			fieldLabel : "Total Deal Amount",
			name : "totaldealamount",
			blankText : "Please enter the Total deal amount."
		})
	],
	buttons : [{
			text : "Reset",
		}, {
			text : "Save",
			formBind : true
		}
	]
});
