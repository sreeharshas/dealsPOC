Ext.define('CRM.store.Deals', {
	extend : 'Ext.data.Store',
	model : 'CRM.model.Deal',
	autoLoad : true,
	autoSync : false,
	pageSize : 25,
	
	//Infinite scroller
	buffered: true,
	purgePageCount:5,
	leadingBufferZone: 25,
	trailingBufferZone: 25,
	
	remoteSort : true,
	remoteGroup : true,
	remoteFilter : true,
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
	,sorters:[
        {
            property:'dealname',
            direction:'ASC'
        }
    ]
});
