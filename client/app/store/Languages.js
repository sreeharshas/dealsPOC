Ext.define('CRM.store.Languages', {
    extend: 'Ext.data.Store',
	model: 'CRM.model.Language',
	data : Ext.sdata.languages
});