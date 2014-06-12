
Ext.define('CRM.view.deals.GridPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.dealsGridPanel',
	requires : [
		'CRM.view.toolbar.AlphaToolbar', 
		'Ext.grid.plugin.BufferedRenderer'
	],
	width : 950,
	collapsible : true,
	animCollapse : true,
	margin : '0 0 20 0',
	height : 410,
	frame : true,
	//enableLocking: true,
	stripeRows : true,
	title : 'Deal Summary',
	loadMask : true,
	viewConfig : {
		stripeRows : true,
		trackOver : false
	},
	plugins: [{//Infinite scroller
			ptype: 'bufferedrenderer',
			variableRowHeight: true,
			trailingBufferZone: 25,
			leadingBufferZone: 25,
			scrollToLoadBuffer: 10
		}
    ], 
	features : [
		{
			ftype : 'filters',
			// encode and local configuration options defined previously for easier reuse
			encode : false, // json encode the filter query
			local : false
		}/*
		,{
			ftype : 'summary'
		}
		,{
			ftype : 'groupingsummary'
		}*/
	],
	store : "Deals",
	region : 'center',
	forceSelection : false,
	autocomplete : false,
	typeAhead : false,
	iconCls : 'icon-user',
	lockable: true,
	columnLines : true,
	defaults: { // defaults are applied to items, not the container
		autoSizeColumn: true, 
		minWidth: 150,
		hideable: false
	},
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
							iconCls : 'Edit'
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
							itemId : 'DealDeleteLink'
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
			hideable : false,
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
			hideable : false,
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
			hideable : false,
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
			hideable : false,
			dataIndex : 'customername',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Type',
			autoSizeColumn: true, 
			minWidth: 100,
			hideable : false,
			sortable : true,
			dataIndex : 'dealtype',
			editor : {
				xtype : 'textfield'
			},
		}, {
			header : 'Start Date',
			autoSizeColumn: true, 
			align: 'right',
			minWidth: 100,
			sortable : true,
			hideable : false,
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
			hideable : false,
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
			hideable : false,
			dataIndex : 'deal',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Comments',
			autoSizeColumn: true, 
			minWidth: 150,
			sortable : true,
			hideable : false,
			dataIndex : 'comments',
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : 'Status',
			autoSizeColumn: true, 
			minWidth: 100,
			sortable : true,
			hideable : false,
			dataIndex : 'status',
			editor : {
				xtype : 'textfield'
			},		
		}, {
			text : 'Lumpsum',
			autoSizeColumn: true, 
			minWidth: 100,
			sortable : true,
			hideable : false,
			align: 'right',
			dataIndex : 'lumpsum',
			//summaryType : 'sum',
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
			hideable : false,
			align: 'right',
			sortable : true,
			dataIndex : 'totaldealamount',
			//summaryType : 'sum',
			editor : {
				xtype : 'numberfield'
			},
			renderer : function (v) {
				return Ext.util.Format.currency(v);
			}
		}
	],
	bbar : [{
			itemId : 'gridAlphaToolbar',
			xtype : 'alphaToolbar'
		}
	],
	tbar : {
		itemId : 'sortToolbar',
		xtype : 'toolbar',
		items : [{
				xtype : 'tbtext',
				text : 'Sorting order:',
				reorderable : false
			}, '-'],
		plugins : [
			Ext.create('Ext.ux.ToolbarDroppable', {
				createItem : function (data) {
					return Ext.create('Ext.Button', {
						"text" : "hello"
					});
				}
			})
		]
	},
	dockedItems : [{
			xtype : 'toolbar',
			itemId : 'gridTopToolbar',
			items : [{
					text : 'New Deal',
					iconCls : 'icon-add',
				}, '-', {
					text : 'Actions',
					iconCls : 'icon-action',
					menu : [{
							text : 'Share',
							itemId : 'shareDeal',
							iconCls : 'icon-share',
							disabled : true
						}, {
							text : 'Clone',
							itemId : 'cloneDeal',
							iconCls : 'icon-clone',
							disabled : true							
						}, {
							text : 'Deal Sheet',
							itemId : 'dealSheet',
							iconCls : 'icon-sheet'
						}
					]
				}, '-', {
					text : 'Select Columns',
					iconCls : 'icon-select',
					menu : [{
							text : 'Name',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Broker',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Customer',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Type',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Start Date',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'End Date',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Deal',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Comments',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Status',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Lumpsum',
							xtype : 'menucheckitem',
							checked : true
						}, {
							text : 'Total Deal Amount',
							xtype : 'menucheckitem',
							checked : true
						}

					]
				}, '-', , {
					xtype : 'filefield',
					id : 'importCSVFileField',
					buttonOnly : true,
					hideLabel : true,
					buttonText : 'Import',
					buttonConfig : {
						iconCls : 'icon-import'
					},
					listeners : {
						afterrender : function () {
							itemFile = document.getElementById("importCSVFileField");
							itemFile.addEventListener('change', handleImportCSV, false);
						}
					}
				}, {
					itemId : 'exportCSV',
					xtype : 'button',
					text : 'Export',
					iconCls : 'icon-export'

				}, '-'
			]
		}
	],

	initComponent : function () {
		var me = this;

		me.on({
			// wait for the first layout to access the headerCt (we only want this once):
			single : true,
			// tell the toolbar's droppable plugin that it accepts items from the columns' dragdrop group
			afterlayout : function (grid) {
				var headerCt = grid.child("headercontainer");
				droppable.addDDGroup(headerCt.reorderer.dragZone.ddGroup);
				me.doSort();
			}
		});

		var reorderer = Ext.create('Ext.ux.BoxReorderer', {
			listeners : {
				Drop : function (r, c, button) { //update sort direction when button is dropped
					me.changeSortDirection(button, false);
				}
			}
		});

		var droppable = Ext.create('Ext.ux.ToolbarDroppable', {
				/**
				 * Creates the new toolbar item from the drop event
				 */
				createItem : function (data) {
					var header = data.header,
					headerCt = header.ownerCt,
					reorderer = headerCt.reorderer;

					// Hide the drop indicators of the standard HeaderDropZone
					// in case user had a pending valid drop in
					if (reorderer) {
						reorderer.dropZone.invalidateDrop();
					}

					return me.createSorterButtonConfig({
						text : header.text,
						sortData : {
							property : header.dataIndex,
							direction : "ASC"
						}
					});
				},

				/**
				 * Custom canDrop implementation which returns true if a column can be added to the toolbar
				 * @param {Object} data Arbitrary data from the drag source. For a HeaderContainer, it will
				 * contain a header property which is the Header being dragged.
				 * @return {Boolean} True if the drop is allowed
				 */
				canDrop : function (dragSource, event, data) {
					var sorters = me.getSorters(),
					header = data.header,
					length = sorters.length,
					entryIndex = this.calculateEntryIndex(event),
					targetItem = this.toolbar.getComponent(entryIndex),
					i;

					// Group columns have no dataIndex and therefore cannot be sorted
					// If target isn't reorderable it could not be replaced
					if (!header.dataIndex || (targetItem && targetItem.reorderable === false)) {
						return false;
					}

					for (i = 0; i < length; i++) {
						if (sorters[i].property == header.dataIndex) {
							return false;
						}
					}
					return true;
				},

				afterLayout : function () {
					me.doSort();
				}
			});

		//create the toolbar with the 2 plugins
		this.tbar = {
			itemId : 'tbar',
			items : [{
					xtype : 'tbtext',
					text : 'Sorting order:',
					reorderable : false
				}
				/*
				, me.createSorterButtonConfig({
					text : 'Broker',
					sortData : {
						property : 'broker',
						direction : 'ASC'
					}
				}), me.createSorterButtonConfig({
					text : 'Customer',
					sortData : {
						property : 'customer',
						direction : 'ASC'
					}
				})*/
				],
			plugins : [reorderer, droppable]
		};

		//this.bbar = [Ext.create('CRM.view.toolbar.AlphaToolbar', { itemId: 'gridAlphaToolbar'})],
		this.callParent();
	},
	viewConfig : {
		stripeRows : true
	},
	/**
	 * Callback handler used when a sorter button is clicked or reordered
	 * @param {Ext.Button} button The button that was clicked
	 * @param {Boolean} changeDirection True to change direction (default). Set to false for reorder
	 * operations as we wish to preserve ordering there
	 */
	changeSortDirection : function (button, changeDirection) {
		var sortData = button.sortData,
		iconCls = button.iconCls;

		if (sortData) {
			if (changeDirection !== false) {
				button.sortData.direction = Ext.String.toggle(button.sortData.direction, "ASC", "DESC");
				button.setIconCls(Ext.String.toggle(iconCls, "sort-asc", "sort-desc"));
			}
			//this.store.clearFilter();
			this.doSort();
		}
	},

	doSort : function () {
		this.store.sort(this.getSorters());
	},

	/**
	 * Returns an array of sortData from the sorter buttons
	 * @return {Array} Ordered sort data from each of the sorter buttons
	 */
	getSorters : function () {
		var sorters = [];
		var tbar = this.down('#tbar');

		Ext.each(tbar.query('button'), function (button) {
			sorters.push(button.sortData);
		}, this);

		return sorters;
	},

	/**
	 * Convenience function for creating Toolbar Buttons that are tied to sorters
	 * @param {Object} config Optional config object
	 * @return {Object} The new Button configuration
	 */
	createSorterButtonConfig : function (config) {
		var me = this;
		config = config || {};
		Ext.applyIf(config, {
			listeners : {
				click : function (button, e) {
					me.changeSortDirection(button, true);
				}
			},
			iconCls : 'sort-' + config.sortData.direction.toLowerCase(),
			reorderable : true,
			xtype : 'button'
		});
		return config;
	}
});
