Ext.define('CRM.model.Language', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'code',
        type: 'string',
        useNull: true
    },{
        name: 'language',
        type: 'string',
        useNull: true
    }]
}); 
