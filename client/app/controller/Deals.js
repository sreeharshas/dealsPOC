Ext.define('CRM.controller.Deals', {
    extend: 'Ext.app.Controller',
	requires: [
          'CRM.model.Deal'
        , 'CRM.model.Language'
        , 'CRM.store.Languages'
        , 'CRM.store.Deals'
        , 'CRM.store.DealsPreview'
        , 'CRM.store.DealStatus'
        , 'CRM.store.DealTypes'
        , 'CRM.view.deals.GridPanel'
        , 'CRM.view.deals.LanguageCombo'
    ],
	views: [
		  'deals.LanguageCombo'
		, 'deals.GridPanel'
    ],
	stores: [
 		'Languages',
		'Deals',
		'DealsPreview',
		'DealStatus',
		'DealTypes'
    ],
	models: [
		'Language',
		'Deal'
	],
	
    init: function() {
        this.control({
			'menucheckitem[text="Name"]':{
				click: function(){ this.handleSelectHideColumns('dealname'); }
			}
			, 'menucheckitem[text="Broker"]':{
				click: function(){ this.handleSelectHideColumns('brokername'); }
			}
			, 'menucheckitem[text="Customer"]':{
				click: function(){ this.handleSelectHideColumns('customername'); }
			}
			, 'menucheckitem[text="Type"]':{
				click: function(){ this.handleSelectHideColumns('dealtype'); }
			}
			, 'menucheckitem[text="Start Date"]':{
				click: function(){ this.handleSelectHideColumns('dealstartdate'); }
			}
			, 'menucheckitem[text="End Date"]':{
				click: function(){ this.handleSelectHideColumns('dealenddate'); }
			}
			, 'menucheckitem[text="Deal"]':{
				click: function(){ this.handleSelectHideColumns('deal'); }
			}
			, 'menucheckitem[text="Comments"]':{
				click: function(){ this.handleSelectHideColumns('comments'); }
			}
			, 'menucheckitem[text="Status"]':{
				click: function(){ this.handleSelectHideColumns('status'); }
			}
			, 'menucheckitem[text="Lumpsum"]':{
				click: function(){ this.handleSelectHideColumns('lumpsum'); }
			}
			, 'menucheckitem[text="Total Deal Amount"]':{
				click: function(){ this.handleSelectHideColumns('totaldealamount'); }
			}
			, 'toolbar button[text="Export"]': {
				click: this.handleExportCSV
			}
			, 'toolbar button[text="New Deal"]': {
				click: this.openDealsWindow
			}
			, '#shareDeal': {
				click: this.shareDeal
			}
			, '#cloneDeal': {
				click: this.cloneDeal
			}
			, '#dealSheet': {
				click: this.openDealSheet
			}
			, '#previewToolbarPanel button[text="Save"]': {
				click: this.saveImportData
			}
			, '#previewToolbarPanel button[text="Cancel"]': {
				click: this.cancelPreviewImportData
			}
			, 'dealsGridPanel actioncolumn': {
				click: this.onActionColumnClick
			}
			, 'dealsGridPanelPreview actioncolumn': {
				click: this.onPreviewActionColumnClick
			}
			, 'dealsGridPanel': {
				itemdblclick: this.onGridColumnDblClick
			}
			, 'alphaToolbar button[text="ALL"]': {
				click: function(){ this.handleAlphaFilters('');}
			}
 			, 'alphaToolbar button[text="A"]': {
				click: function(){ this.handleAlphaFilters('A');}
			}
			, 'alphaToolbar button[text="B"]': {
				click: function(){ this.handleAlphaFilters('B');}
			}
			, 'alphaToolbar button[text="C"]': {
				click: function(){ this.handleAlphaFilters('C');}
			}
			, 'alphaToolbar button[text="D"]': {
				click: function(){ this.handleAlphaFilters('D');}
			}
			, 'alphaToolbar button[text="E"]': {
				click: function(){ this.handleAlphaFilters('E');}
			}
			, 'alphaToolbar button[text="F"]': {
				click: function(){ this.handleAlphaFilters('F');}
			}
			, 'alphaToolbar button[text="G"]': {
				click: function(){ this.handleAlphaFilters('G');}
			}
			, 'alphaToolbar button[text="H"]': {
				click: function(){ this.handleAlphaFilters('H');}
			}
			, 'alphaToolbar button[text="I"]': {
				click: function(){ this.handleAlphaFilters('I');}
			}
			, 'alphaToolbar button[text="J"]': {
				click: function(){ this.handleAlphaFilters('J');}
			}
			, 'alphaToolbar button[text="K"]': {
				click: function(){ this.handleAlphaFilters('K');}
			}
			, 'alphaToolbar button[text="L"]': {
				click: function(){ this.handleAlphaFilters('L');}
			}
			, 'alphaToolbar button[text="M"]': {
				click: function(){ this.handleAlphaFilters('M');}
			}
			, 'alphaToolbar button[text="N"]': {
				click: function(){ this.handleAlphaFilters('N');}
			}
			, 'alphaToolbar button[text="O"]': {
				click: function(){ this.handleAlphaFilters('O');}
			}
			, 'alphaToolbar button[text="P"]': {
				click: function(){ this.handleAlphaFilters('P');}
			}
			, 'alphaToolbar button[text="Q"]': {
				click: function(){ this.handleAlphaFilters('Q');}
			}
			, 'alphaToolbar button[text="R"]': {
				click: function(){ this.handleAlphaFilters('R');}
			}
			, 'alphaToolbar button[text="S"]': {
				click: function(){ this.handleAlphaFilters('S');}
			}
			, 'alphaToolbar button[text="T"]': {
				click: function(){ this.handleAlphaFilters('T');}
			}
			, 'alphaToolbar button[text="U"]': {
				click: function(){ this.handleAlphaFilters('U');}
			}
			, 'alphaToolbar button[text="V"]': {
				click: function(){ this.handleAlphaFilters('V');}
			}
			, 'alphaToolbar button[text="W"]': {
				click: function(){ this.handleAlphaFilters('W');}
			}
			, 'alphaToolbar button[text="X"]': {
				click: function(){ this.handleAlphaFilters('X');}
			}
			, 'alphaToolbar button[text="Y"]': {
				click: function(){ this.handleAlphaFilters('Y');}
			}
			, 'alphaToolbar button[text="Z"]': {
				click: function(){ this.handleAlphaFilters('Z');}
			}
			, 'dealsForm button[text="Reset"]' : {
				click: this.dealsFrmResetClick
			}
			, 'dealsForm button[text="Save"]' : {
				click: this.dealsFrmSaveClick
			}		
			, 'dealsGridPanel' : {
				selectionchange: this.rowSelectionChange
			}
       });	
	   
	   Ext.QuickTips.init();
	}

	, handleSelectHideColumns: function(menuName, checked){
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var idx = findColumnIndex(grid.columns, menuName);
        grid.columns[idx].setVisible(!grid.columns[idx].isVisible());
	}
	
	, handleExportCSV: function(){
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var filters = grid.getStore().filters;
		var filterStr = '{}';
		if(filters.items !== 'undefined' && filters.items.length > 0){
			var filter = {};
			filter.property = filters.items[0].property;
			filter.value = filters.items[0].value
			filterStr = JSON.stringify(filter);
		}
		
		window.open('/collections/deals/exportToExcel?filter=' + filterStr);
	}
	
	, handleAlphaFilters: function(fltrText){
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var store = grid.getStore();
		store.clearFilter(true); 
		
		if(fltrText !== '')
			fltrText = '^' + fltrText;
			
		store.filter("dealname", fltrText);
	}
	
	, openDealsWindow: function(){
		var dealsWindow = Ext.ComponentQuery.query('#dealsWindow')[0];
		
		if(dealsWindow === undefined){
			dealsWindow = Ext.create('CRM.view.window.DealsWindow');
			dealsWindow.itemId = 'dealsWindow';
		}
		dealsWindow.record = undefined;	
		dealsWindow.show();
	}
	
	, shareDeal: function(){
		alert('You clicked on "Share Deal".');
	}
	
	, cloneDeal: function(){
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var selection = grid.getView().getSelectionModel().getSelection()[0];
		var copyRow = selection.copy();
		grid.getView().getSelectionModel().deselectAll(true);
		copyRow.data._id = null;

		var dealsWindow = Ext.ComponentQuery.query('#dealsWindow')[0];
		if(dealsWindow === undefined){
			dealsWindow = Ext.create('CRM.view.window.DealsWindow');
			dealsWindow.itemId = 'dealsWindow';
		}
		
		if (copyRow) {
			dealsWindow.record = copyRow;
			dealsWindow.show();
		}
	}
	
	, openDealSheet: function(){
		alert('You clicked on "Deal Sheet".');
	}
	, onGridColumnDblClick: function(view, record, item, index, e, eOpts) {
		var me = this
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var dealsWindow = Ext.ComponentQuery.query('#dealsWindow')[0];
		
		if(dealsWindow === undefined){
			dealsWindow = Ext.create('CRM.view.window.DealsWindow');
			dealsWindow.itemId = 'dealsWindow';
		}
			
		dealsWindow.record = record;
		dealsWindow.show();
	}

	, onActionColumnClick: function(view, cell, rowIndex, colIndex, e, record, row) {
		var me = this,
		    targetEl = Ext.get(e.getTarget());
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		var dealsWindow = Ext.ComponentQuery.query('#dealsWindow')[0];
		var rec = grid.getStore().getAt(rowIndex);			
		
		if(dealsWindow === undefined){
			dealsWindow = Ext.create('CRM.view.window.DealsWindow');
			dealsWindow.itemId = 'dealsWindow';
		}
			
		if (targetEl.hasCls('Edit')) {
			dealsWindow.record = record;
			dealsWindow.show();
		} else if (targetEl.hasCls('Delete')) {
			grid.getStore().remove(rec);
			alert("Deleted record: " + rec.get('dealname'));
		}
	}
	
	, onPreviewActionColumnClick: function(view, cell, rowIndex, colIndex, e, record, row) {
		var me = this,
		    targetEl = Ext.get(e.getTarget());
		var grid = Ext.ComponentQuery.query('#dealsGridPanelPreview')[0];
		var rec = grid.getStore().getAt(rowIndex);
			
		if (targetEl.hasCls('Edit')) {
			rowEditing.startEdit(rowIndex, 0);
		} else if (targetEl.hasCls('Delete')) {
			grid.getStore().remove(rec);
			alert("Deleted record: " + rec.get('dealname'));
		}
	}
	
	, dealsFrmResetClick: function(){
		var dealsForm = Ext.ComponentQuery.query('#dealsWindow > #dealsForm')[0];
		dealsForm.getForm().reset();
	}
	
	, dealsFrmSaveClick: function(){
		var dealsWindow = Ext.ComponentQuery.query('#dealsWindow')[0];
		var dealsForm = Ext.ComponentQuery.query('#dealsWindow > #dealsForm')[0];
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		
		if (dealsForm.getForm().isValid()) {
			//dealsForm.getForm().method = 'post';
			dealsForm.getForm().submit({
				//clientValidation: true,
				success: function(form, action) {
					grid.getStore().load();
					dealsWindow.close();
				},
				failure: function(form, action) {
					Ext.Msg.alert("Record Create/Update failed", JSON.stringify(action.result));
				}
			});
		}
	}
	
	, rowSelectionChange: function(selModel, selections){
        var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
        grid.down('#cloneDeal').setDisabled(selections.length === 0);
        grid.down('#shareDeal').setDisabled(selections.length === 0);
    }
	
	, saveImportData: function(){
		var previewGrid = Ext.ComponentQuery.query('#dealsGridPanelPreview')[0];
		var dealsPreviewWindow = Ext.ComponentQuery.query('#dealsWindowPreview')[0];
		var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
		
		previewGrid.getStore().sync({
			success: function(batch, options) {
				grid.getStore().load();
				dealsPreviewWindow.close();
			},
			failure: function(batch, options) {
				Ext.Msg.alert("Record Create/Update failed", JSON.stringify(batch.exceptions));
			}
		});
	}
	
	, cancelPreviewImportData: function(){
		var dealsPreviewWindow = Ext.ComponentQuery.query('#dealsWindowPreview')[0];
		dealsPreviewWindow.close();
	}
});

var findColumnIndex = function(columns, dataIndex) {
	var index;
	for (index = 0; index < columns.length; ++index) 
		if (columns[index].dataIndex == dataIndex)
			break; 

	return index == columns.length ? -1 : index;
};

var getRow = function(row) {
	var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
	var store = grid.getStore();
	console.log(row);
	
	if(row.length > 0){
		var array = row.split(',');
		//var data = [];
		console.log(JSON.stringify(array));
		var dealsObj = {};
		dealsObj._id = null;
		dealsObj.dealname = array[0];
		dealsObj.brokername = array[1];
		dealsObj.customername = array[2];
		dealsObj.dealtype = array[3];
		dealsObj.dealstartdate = array[4];
		dealsObj.dealenddate = array[5];
		dealsObj.deal = array[6];
		dealsObj.comments = array[7];
		dealsObj.status = array[8];
		dealsObj.lumpsum = array[9];
		dealsObj.totaldealamount = array[10];
		return dealsObj;
	}
	
	return null;
}

var txtDelimiter = ",";
var endLine = "\r\n";

var processFile = function(file) {	
	var reader = new FileReader();

	reader.onload = function(e) {
		var rows = atob(e.target.result.split(txtDelimiter)[1]).split(endLine);
		rows.shift();
		console.log(JSON.stringify(rows));
		console.log(rows.length);

		var data = [];
		for(var i=0;i<rows.length;i++){
			var rowObj = getRow(rows[i]);
			if(rowObj != null)
				data.push(rowObj);
		}
		
		var dealsWindowPreview = Ext.ComponentQuery.query('#dealsWindowPreview')[0];
		
		if(dealsWindowPreview === undefined){
			dealsWindowPreview = Ext.create('CRM.view.window.DealsWindowPreview');
			dealsWindowPreview.itemId = 'dealsWindowPreview';
		}
		
		dealsWindowPreview.data = data;
		dealsWindowPreview.show();
	};
	
	reader.readAsDataURL(file);
}

var handleImportCSV = function (e){  
	var files = e.target.files;
	if ( files && files.length ) {
		Ext.each(files, processFile);
	}
}

var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
	listeners: {
		cancelEdit: function(rowEditing, context) {
			// Canceling editing of a locally added, unsaved record: remove it
			if (context.record.phantom) {
				var grid = Ext.ComponentQuery.query('#dealsGridPanelID')[0];
				var store = grid.getStore();
				store.remove(context.record);
			}
		}
	}
});

