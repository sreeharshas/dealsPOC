Ext.define('CRM.model.Deal', {
	extend: 'Ext.data.Model',

	fields: [
		{
			name: '_id',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'dealname',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'brokername',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'customername',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'dealtype',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'dealstartdate',
			type: 'date',
			useNull: true
		}
	  , {
			name: 'dealenddate',
			type: 'date',
			useNull: true
		}
	  , {
			name: 'deal',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'comments',
			type: 'string',
			useNull: true
		}		
	  , {
			name: 'status',
			type: 'string',
			useNull: true
		}
	  , {
			name: 'lumpsum',
			type: 'float',
			useNull: true
		}
	  , {
			name: 'totaldealamount',
			type: 'float',
			useNull: true
		}
	]
}); 
