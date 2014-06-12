Ext.define('CRM.store.DealStatus', {
	extend : 'Ext.data.Store',
	fields: ['status', "meaning"],
	data : [
		{"status":"DRAFT", "meaning":"Draft"},
		{"status":"FROZEN", "meaning":"Frozen"}
	]
});