Ext.define('CRM.store.DealTypes', {
	extend : 'Ext.data.Store',
	fields: ['type', "meaning"],
	data : [
		{"type":"AD", "meaning":"Ad"},
		{"type":"DISPLAY", "meaning":"Display"}
	]
});