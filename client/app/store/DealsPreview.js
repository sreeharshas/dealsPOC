Ext.define('CRM.store.DealsPreview', {
	extend : 'Ext.data.Store',
	model : 'CRM.model.Deal',
	autoLoad : false,
	pageSize : 5000,
	remoteSort : false,
	remoteGroup : false,
	remoteFilter : false,
	proxy : {
		type : 'rest',
		method : 'GET',
		url : '/collections/deals/',
		reader : {
			type : 'json',
			root : 'data',
			totalProperty : 'total',
			successProperty : 'success'
		},
		writer : {
			type : 'json'
		}
	}
});
