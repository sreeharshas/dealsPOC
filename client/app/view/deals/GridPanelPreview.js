
Ext.define('CRM.view.deals.GridPanelPreview', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.dealsGridPanelPreview',
	width : 950,
	height : 400,
	frame : false,
	stripeRows : true,
	title : '',
	loadMask : true,
	viewConfig : {
		stripeRows : true,
		trackOver : false
	},
	store : "DealsPreview",
	plugins: [rowEditing],
	region : 'center',
	forceSelection : false,
	autocomplete : false,
	typeAhead : false,
	columnLines : true,
	columns : [{
			text : 'Action',
			menuDisabled : true,
			sortable : false,
			hideable : false,
			locked: false,
			columns : [{
					xtype : 'actioncolumn',
					width : 50,
					height : 0,
					align : 'center',
					menuDisabled : true,
					sortable : false,
					hideable : false,
					items : [{
							icon : 'resources/images/edit.png', // Use a URL in the icon config
							tooltip : 'Edit',
							itemId : 'DealEditLink',
							xtype : 'button',
							iconCls : 'Edit' /*,
							handler: function(grid, rowIndex, colIndex) {
								rowEditing.startEdit(rowIndex, 0);
							}*/
						}
					]
				}, {
					xtype : 'actioncolumn',
					width : 50,
					height : 0,
					align : 'center',
					hideable : false,
					sortable : false,
					menuDisabled : true,

					items : [{
							icon : 'resources/images/delete.png',
							tooltip : 'Delete',
							xtype : 'button',
							iconCls : 'Delete',
							itemId : 'DealDeleteLink'/*,
							handler: function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								store.remove(rec);
								alert("Deleted record: " + rec.get('title'));
							}*/
						}
					]
				}
			]
		}, {
			text : 'Id',
			hideable : false,
			width : 0,
			sortable : true,
			dataIndex : '_id',
			locked: false,
			hidden : true,
			editor : {
				xtype : 'textfield'
			}
		}, {
			text : 'Name',
			flex : 1,
			sortable : true,
			locked: false,
			dataIndex : 'dealname',		
			autoSizeColumn: true, 
			minWidth: 150,
			editor : {
				xtype : 'textfield'
			},
			filter : {
				type : 'string',
				dataIndex : 'dealname',
				iconCls : 'ux-gridfilter-text-icon' // default
			}
		}, {
			text : 'Broker',
			flex : 1,
			sortable : true,
			//locked: true,
			autoSizeColumn: true, 
			minWidth: 150,
			dataIndex : 'brokername',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Customer',
			autoSizeColumn: true, 
			minWidth: 150,
			sortable : true,
			//locked: true,
			dataIndex : 'customername',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Type',
			autoSizeColumn: true, 
			minWidth: 100,
			sortable : true,
			dataIndex : 'dealtype',
			editor : {
				xtype:'combo',
				typeAhead: true,
				triggerAction: 'all',
				store: 'DealTypes',
				queryMode: 'local',
				//data: 'DealTypes',
				displayField: 'meaning',
				valueField: 'type',
				editable: false,
				forceSelection: true
			},
		}, {
			header : 'Start Date',
			autoSizeColumn: true, 
			align: 'right',
			minWidth: 100,
			sortable : true,
			dataIndex : 'dealstartdate',
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			editor : {
				xtype : 'datefield'
			},
		}, {
			header : 'End Date',
			autoSizeColumn: true, 
			align: 'right',
			minWidth: 100,
			sortable : true,
			dataIndex : 'dealenddate',
			renderer: Ext.util.Format.dateRenderer('d-m-Y'),
			editor : {
				xtype : 'datefield'
			},
		}, {
			text : 'Deal',
			flex : 1,
			sortable : true,
			autoSizeColumn: true, 
			minWidth: 100,
			dataIndex : 'deal',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Comments',
			autoSizeColumn: true, 
			minWidth: 150,
			sortable : true,
			dataIndex : 'comments',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Status',
			autoSizeColumn: true, 
			minWidth: 100,
			sortable : true,
			dataIndex : 'status',
			editor : {
				xtype:'combo',
				typeAhead: true,
				triggerAction: 'all',
				store: 'DealStatus',
				queryMode: 'local',
				//data: 'DealStatus',
				displayField: 'meaning',
				valueField: 'status',
				editable: false,
				forceSelection: true
			},		
		}, {
			text : 'Lumpsum',
			autoSizeColumn: true, 
			minWidth: 100,
			sortable : true,
			align: 'right',
			dataIndex : 'lumpsum',
			summaryType : 'sum',
			editor : {
				xtype : 'numberfield'
			},
			renderer : function (v) {
				return Ext.util.Format.currency(v);
			}
		}, {
			text : 'Total Deal Amount',
			autoSizeColumn: true, 
			minWidth: 125,
			align: 'right',
			sortable : true,
			dataIndex : 'totaldealamount',
			summaryType : 'sum',
			editor : {
				xtype : 'numberfield'
			},
			renderer : function (v) {
				return Ext.util.Format.currency(v);
			}
		}
	],
	viewConfig : {
		stripeRows : true
	}
});
